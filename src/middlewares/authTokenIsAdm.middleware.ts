import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"

const authTokenAdmMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user.isAdm) {
        throw new AppError(401, "User is not administrator")
    }
    next()
}
export default authTokenAdmMiddleware
