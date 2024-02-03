import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import AuthenticatedRequest from '../interfaces/request'
import { RequestHandler } from 'express'


const logEvents = async (message: string, logFileName: string) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(join(__dirname, '..', '..', 'logs'))) {
            await fsPromises.mkdir(join(__dirname, '..', '..', 'logs'))
        }
        await fsPromises.appendFile(join(__dirname, '..', '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}
const logger: RequestHandler<{}, {}, AuthenticatedRequest> = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}
export { logEvents, logger }