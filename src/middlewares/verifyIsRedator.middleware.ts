import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"

const verifyIsRedatorMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user.isWriter) {
        throw new AppError(401, "User is not redator")
    }
    next()
}
export default verifyIsRedatorMiddleware
