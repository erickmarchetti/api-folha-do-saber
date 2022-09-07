import { NextFunction, Request, Response } from "express"
import AppDataSource from "../data-source"
import { AppError } from "../errors/appError"
import { News } from "../entities/news.entities"

const newsReallyExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const newsId = req.params.id

    const newsRepository = AppDataSource.getRepository(News)
    const targetNews = await newsRepository.findOneBy({ id: newsId })

    if (!targetNews) {
        throw new AppError(404, "News not found")
    }

    next()
}

export default newsReallyExistsMiddleware
