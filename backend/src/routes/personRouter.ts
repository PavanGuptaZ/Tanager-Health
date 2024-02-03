import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import { getPersonsById, getPersonsList, postPerson, updatePerson } from '../controller/personController';

const router = express.Router()

router.use(verifyJWT)

router.get('/', getPersonsList)

router.get('/:personId', getPersonsById)

router.patch('/:personId', updatePerson)

router.post('/', postPerson)



export default router