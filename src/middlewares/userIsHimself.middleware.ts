import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"
import { Users } from "../entities/users.entities"
import AppDataSource from "../data-source"
import jwt from "jsonwebtoken"
import "dotenv/config"

const userIsHimselfMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const usersRepository = AppDataSource.getRepository(Users)
    const users = await usersRepository.find()

    const { authorization } = req.headers

    let token = authorization?.split(" ")[1]

    if (!token) {
        throw new AppError(401, "Missing authorization token")
    }

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            const userId = decoded.id
            const user = users.find((user) => user.id === userId)

            if (userId !== req.params.id && !user?.isAdm) {
                throw new AppError(401, "Unauthorized")
            }

            next()
        }
    )
}

export default userIsHimselfMiddleware
