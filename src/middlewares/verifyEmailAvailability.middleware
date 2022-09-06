import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"
import { User } from "../entities/user.entity"
import AppDataSource from "../data-source"

const verifyEmailAvailabilityMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const emailAlreadyExists = users.find((user) => user.email === email)

    if (emailAlreadyExists) {
        throw new AppError(400, "E-mail already registered")
    }

    next()
}

export default verifyEmailAvailabilityMiddleware
