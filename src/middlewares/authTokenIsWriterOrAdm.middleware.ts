import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"

const authTokenWriterOrAdmMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user.isWriter && !req.user.isAdm) {
        throw new AppError(
            401,
            "User is not a writer neither an administrator."
        )
    }
    next()
}
export default authTokenWriterOrAdmMiddleware
