import PersonModal from '../models/personModal'
import AppointmentModal from '../models/appointmentModal'
import asyncErrorHandler from '../utils/asyncErrorHandler';
import AuthenticatedRequest from '../interfaces/request';
import { Response } from 'express';

export const getAppointmentListByPerson = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'User not authenticated' });

    const { _id, role } = req.user;
    const { personId } = req.params;

    let person = await PersonModal.findOne({ _id: personId }).lean().select({ userId: 1 })
    if (!person) return res.status(404).json({ message: "No Person Found" })

    if (person.userId.toString() == _id || role == 'admin') {

        let list = await AppointmentModal.find({ personId: _id }).lean().select({ name: 1, relation: 1, dateOfBirth: 1, profileIcon: 1 })

        if (list.length < 1) return res.status(404).json({ status: "error", message: "No Appointments Found" })

        res.status(200).json({ status: "success", list })
    } else {
        return res.status(401).json({ status: "error", message: "You Don't have access of this person" })

    }
})
