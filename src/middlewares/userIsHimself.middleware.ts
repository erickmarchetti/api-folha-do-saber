import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"
import "dotenv/config"

const userIsHimselfMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.user.userId !== req.params.id && !req.user.isAdm) {
        throw new AppError(401, "Unauthorized")
    }

    next()
}

export default userIsHimselfMiddleware
