import { NextFunction, Request, Response } from "express"
import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import { AppError } from "../errors/appError"

const userReallyExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.params.id

    const userRepository = AppDataSource.getRepository(Users)
    const targetUser = await userRepository.findOneBy({ id: userId })

    if (!targetUser) {
        throw new AppError(404, "User not found")
    }

    next()
}

export default userReallyExistsMiddleware
