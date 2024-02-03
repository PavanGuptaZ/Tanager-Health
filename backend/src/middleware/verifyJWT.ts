import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import AuthenticatedRequest from "../interfaces/request";


const verifyJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const authHeaders = req.headers
    const authorizationHeader = authHeaders.authorization || authHeaders.Authorization;

    if (authorizationHeader || authorizationHeader?.startsWith('Bearer ')) {

        const ACCESS_TOKEN = typeof authorizationHeader == 'string' ? authorizationHeader.split(' ')[1] : "";

        jwt.verify(ACCESS_TOKEN, process.env.ACCESS_TOKEN as Secret, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
            if (err) {
                verifyRefreshToken(req, res, next)
            } else {
                req.user = decoded as { _id: string, role: string, email: string }
                next()
            }

        })

    } else {
        verifyRefreshToken(req, res, next)
    }

    function verifyRefreshToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const refreshTokenCookie = req.cookies?.REFRESH_TOKEN

        if (!refreshTokenCookie) {
            return res.status(404).json({ status: 'error', message: "Please Login With credentials" })
        }

        jwt.verify(refreshTokenCookie, process.env.REFRESH_TOKEN as Secret, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
            if (err) {
                return res.status(401).json({ error: "Token verification failed" });
            }
            if (typeof decoded === 'object' && decoded !== null) {
                const accessToken = jwt.sign({ email: decoded.email, _id: decoded._id, role: decoded.role }, process.env.ACCESS_TOKEN as Secret, { expiresIn: '1h' })
                res.setHeader(`ACCESS_TOKEN`, accessToken)

                req.user = decoded as { _id: string, role: string, email: string }
                next()
            }
        })

    }
}
export default verifyJWT