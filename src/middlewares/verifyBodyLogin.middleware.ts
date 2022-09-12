import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"

const verifyBodyLoginMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body

    if (!email) {
        throw new AppError(400, "Email is required")
    }

    if (!password) {
        throw new AppError(400, "Password is required")
    }

    next()
}

export default verifyBodyLoginMiddleware
