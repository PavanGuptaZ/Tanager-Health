import { Response } from 'express';
import AuthenticatedRequest from '../interfaces/request';
import PersonModal from '../models/personModal'
import asyncErrorHandler from '../utils/asyncErrorHandler';

export const getPersonsList = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'User not authenticated' });

    const { _id } = req.user;

    let list = await PersonModal.find({ userId: _id }).lean().select({ name: 1, relation: 1, dateOfBirth: 1, profileIcon: 1 })

    if (list.length < 1) return res.status(404).json({ message: "No Person Found" })

    res.status(200).json({ status: "success", list })
})

export const getPersonsById = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'User not authenticated' });

    const { _id, role } = req.user;
    const { personId } = req.params

    let person = await PersonModal.findOne({ _id: personId }).lean()
    if (!person) return res.status(404).json({ message: "No Person Found" })

    if (person.userId.toString() == _id || role == 'admin') {

        res.status(200).json({ status: "success", person })

    } else {
        return res.status(401).json({ status: "error", message: "You Don't have access of this person" })

    }


})

export const postPerson = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'User not authenticated' });

    const { _id } = req.user;

    let { profileIcon, name, relation, dateOfBirth } = req.body;

    let isExist = await PersonModal.findOne({ userId: _id, name })
    if (isExist) {
        return res.status(409).send({ status: 'error', message: name + " is already Exist in your account" })
    }

    if (!profileIcon && !name && !relation && !dateOfBirth) {
        return res.status(404).json({ status: "error", message: "All Fields are Required" })
    }

    let Person = new PersonModal({ profileIcon, name, relation, dateOfBirth, userId: _id })
    let newPerson = await Person.save()

    res.status(200).json({ status: "success", newPerson })
})

export const updatePerson = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'User not authenticated' });

    const { _id } = req.user;
    const { personId } = req.params;

    let { profileIcon, name, relation, dateOfBirth } = req.body;

    let isExist = await PersonModal.findOne({ _id: personId }).lean()
    if (!isExist) {
        return res.status(409).send({ status: 'error', message: name + " is not Exist" })
    }

    if (isExist.userId.toString() !== _id.toString()) {
        return res.status(401).json({ status: "error", message: "You Don't have access to update this person" })
    }

    const updatedPerson = await PersonModal.updateOne({ _id: personId }, { $set: { profileIcon, name, relation, dateOfBirth } })
    res.status(200).json({ status: "success" })
})