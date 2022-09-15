import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"
import { Users } from "../entities/users.entities"
import AppDataSource from "../data-source"

const verifyEmailAvailabilityMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body

    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()

    const emailAlreadyExists = users.find((user) => user.email === email)

    if (emailAlreadyExists) {
        throw new AppError(400, "User already exists.")
    }

    next()
}

export default verifyEmailAvailabilityMiddleware
