import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppError } from "../errors/appError"

const authTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization

    if (!token) {
        throw new AppError(401, "Token not found!")
    }

    const splitToken = token.split(" ")

    jwt.verify(
        splitToken[1],
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError(401, "Invalid token!")
            }
            req.user = {
                isAdm: decoded.isAdm,
                userId: decoded.userId,
                isWriter: decoded.isWriter
            }
            next()
        }
    )
}
export default authTokenMiddleware
