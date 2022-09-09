import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"

const nameEmailPasswordIsRequiredMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {name, email, password} = req.body    

    if (!name) {
        throw new AppError(400, "Name is required")
    }

    if (!email) {
        throw new AppError(400, "Email is required")
    }

    if (!password) {
        throw new AppError(400, "Password is required")
    }
 
    next()
}

export default nameEmailPasswordIsRequiredMiddleware
