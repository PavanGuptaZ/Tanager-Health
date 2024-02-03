import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken';
import UserModal from '../models/userModal'
import DoctorModal from '../models/doctorModal'
import AdminModal from '../models/adminModal'
import { NextFunction, Request, RequestHandler, Response } from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import AuthenticatedRequest from '../interfaces/request';


export const Register: RequestHandler = asyncErrorHandler(async (req, res, next) => {
    let { name, email, password, phone, role } = req.body

    if (!name && !email && !password && !phone && !role) {
        return res.status(404).json({ status: 'error', message: "all Fields are Required" })
    }

    let isExist = await findUser(role, email)
    if (isExist) {
        return res.status(409).send({ status: 'error', message: email + " is already Register" })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    if (role === 1) {
        let newUser = new UserModal({ name, email, password: hashPassword, phone })
        await newUser.save()
        next()
    } else if (role === 2) {
        let newUser = new DoctorModal({ name, email, password: hashPassword, phone })
        await newUser.save()
        next()
    } else if (role === 3) {
        let newUser = new AdminModal({ name, email, password: hashPassword, phone })
        await newUser.save()
        next()
    } else {
        return res.status(404).json({ status: 'error', message: "Role is not Specified" })
    }
})

export const Login: RequestHandler = asyncErrorHandler(async (req, res) => {
    let { email, password, role } = req.body

    if (!email && !password && !role) {
        return res.status(404).json({ status: 'error', message: "all Fields are Required" })
    }

    let isExist = await findUser(role, email)

    if (!isExist) {
        return res.status(404).send({ status: 'error', message: email + " is not Register" })
    }

    const passwordCheck = await bcrypt.compare(password, isExist.password)
    if (!passwordCheck) {
        return res.status(404).send({ status: 'error', message: "Check Your credentials, Password is Wrong" })
    }

    const accessToken = jwt.sign({ email, role, _id: isExist._id }, process.env.ACCESS_TOKEN as Secret, { expiresIn: '1h' })

    if (!!req.body.stayLogin) {
        const refreshToken = jwt.sign({ email, role, _id: isExist._id }, process.env.REFRESH_TOKEN as Secret, { expiresIn: '1d' })

        res.cookie(`REFRESH_TOKEN`, refreshToken, {
            sameSite: false,
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        })

    }

    let { password: _delete, ...rem } = isExist

    res.json({ status: "success", user: { ...rem, token: accessToken } })
})

export const Refresh: RequestHandler = asyncErrorHandler(async (req, res) => {
    let { REFRESH_TOKEN } = req.cookies

    if (!REFRESH_TOKEN) {
        return res.status(404).json({ status: 'error', message: "Please Login With credentials" })
    }

    jwt.verify(REFRESH_TOKEN, process.env.REFRESH_TOKEN as Secret, async (err: VerifyErrors | null, data: JwtPayload | string | { role: Number, email: string, _id: string } | undefined) => {
        if (err || typeof data !== 'object' || data !== null && !('role' in data)) return res.status(400).json({ status: 'error', message: "Please Login With credentials" })

        let { role, email, _id } = data
        let isExist = await findUser(role, email, _id)

        if (!isExist) {
            return res.status(404).send({ status: 'error', message: email + " is something Wrong" })
        }

        const accessToken = jwt.sign({ role, email, _id }, process.env.ACCESS_TOKEN as string, { expiresIn: '1h' })

        let { password: _delete, ...rem } = isExist

        res.json({ status: "success", user: { ...rem, token: accessToken } })
    })
})

export const updatedata = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response) => {

    const role = Number(req.params.role);

    if (typeof role !== "number") return res.status(404).send({ status: 'error', message: "Invalid Role" });

    if (!req.user) {
        return res.status(401).json({ status: 'error', message: 'User not authenticated' });
    }

    const { email } = req.user;

    let providedData = req.body as { name?: string, phone?: string | number, address?: string, profileIcon?: number, password?: string };

    if (!providedData?.password) {
        return res.status(404).send({ status: 'error', message: "Password is Required" })
    }

    let isExist = await findUser(role, email)
    if (!isExist) {
        return res.status(404).send({ status: 'error', message: email + " is not Register" })
    }

    const passwordCheck = await bcrypt.compare(providedData?.password, isExist.password)
    if (!passwordCheck) {
        return res.status(404).send({ status: 'error', message: "Check Your credentials, Password is Wrong" })
    }

    delete providedData.password

    let newUser
    if (role === 1) {
        newUser = await UserModal.updateOne({ _id: isExist._id }, {
            $set: {
                ...providedData
            }
        })
    } else if (role === 2) {
        newUser = await DoctorModal.updateOne({ _id: isExist._id }, {
            $set: {
                ...providedData
            }
        })
    } else if (role === 3) {
        newUser = await AdminModal.updateOne({ _id: isExist._id }, {
            $set: {
                ...providedData
            }
        })
    } else {
        return res.status(404).json({ status: 'error', message: "Role is not Specified" })
    }

    res.status(200).json({ status: "success" })
})

export const logout: RequestHandler = asyncErrorHandler(async (req, res) => {
    res.clearCookie(`REFRESH_TOKEN`, {
        sameSite: false,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    })
    res.status(200).json({ status: 'ok', message: "Logout Successfully" })

})

async function findUser(role: number, email: string, _id?: string) {

    let helper = _id ? { email: email, _id: _id } : { email: email };

    if (role === 1) {
        return await UserModal.findOne(helper).lean()
    } else if (role === 2) {
        return await DoctorModal.findOne(helper).lean()
    } else if (role === 3) {
        return await AdminModal.findOne(helper).lean()
    } else {
        return false
    }
}