import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import { getAppointmentListByPerson } from '../controller/appointmentController';

const router = express.Router()

router.use(verifyJWT)

router.get('/list/:personId', getAppointmentListByPerson)




export default router