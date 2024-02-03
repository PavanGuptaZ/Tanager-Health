import { NextFunction, Request, Response } from "express"
import AuthenticatedRequest from "../interfaces/request";

type AsyncMiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (func: AsyncMiddlewareFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: Error) => next(err))
    }
}