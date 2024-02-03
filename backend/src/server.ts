import express from "express";
const app = express();
const appError = express();

import cors from 'cors';
import cookieParser from "cookie-parser";
import allowedOrigins from "./config/allowedOrigins";
import { logEvents, logger } from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import connectDb from "./config/dbConnection";
import path from "path";



app.use(cors({
    origin: (origin, callBack) => {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callBack(null, true)
        } else {
            callBack(new Error('Not Allowed By CORS'), false)
        }
    },
    credentials: true,
    optionsSuccessStatus: 202
}))

app.use(express.static('public'))
appError.use(express.static('public'))

app.use(logger)
app.use(express.json())
app.use(cookieParser())

import HomeRouter from './routes/homeRouter';
import AuthRouter from './routes/authRouter';
import PersonRouter from './routes/personRouter';
import AppointmentRouter from './routes/appointmentRouter';

app.use('/', HomeRouter)
app.use('/auth', AuthRouter)
app.use('/person', PersonRouter)
app.use('/appointment', AppointmentRouter)


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'views/404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('text').send('404 Not Found')
    }
})

appError.all('*', (req, res) => {
    res.status(500)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'views/500.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '500 Database is not connected' })
    } else {
        res.type('text').send('500 Database is not connected')
    }
})

app.use(errorHandler)

connectDb().then(() => {

    app.listen(8000, () => {
        console.log("API is started");
    });

}).catch((err) => {

    appError.listen(8000, () => {
        console.log("API2 is started");
    });

    console.log(err.message)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
