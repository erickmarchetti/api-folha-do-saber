import { NextFunction, Request, Response } from "express"
import AppDataSource from "../data-source"
import { News } from "../entities/news.entities"
import { Users } from "../entities/users.entities"
import { AppError } from "../errors/appError"

const newsBelongsToTheUserMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user.userId
    const newsId = req.params.id

    const usersRepository = AppDataSource.getRepository(Users)
    const targetUser = await usersRepository.findOne({
        where: { id: userId },
        relations: { writer: true }
    })

    const newsRepository = AppDataSource.getRepository(News)
    const targetNews = await newsRepository.findOne({
        where: { id: newsId },
        relations: { writer: true }
    })

    if (targetNews!.writer?.id !== targetUser!.writer?.id && !req.user.isAdm) {
        throw new AppError(401, "Unauthorized")
    }

    next()
}

export default newsBelongsToTheUserMiddleware
