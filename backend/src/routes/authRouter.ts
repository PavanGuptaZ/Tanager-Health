import express, { Request, RequestHandler } from "express";
import { Login, Refresh, Register, logout, updatedata } from "../controller/authController";
import verifyJWT from "../middleware/verifyJWT";
import loginLimiter from "../middleware/loginLimiter";

const router = express.Router()

router.post('/register', loginLimiter, Register, Login)

router.post('/login', loginLimiter, Login)

router.get('/refresh', Refresh)


router.post('/logout', logout)

router.post('/update/:role', verifyJWT, updatedata)

export default router