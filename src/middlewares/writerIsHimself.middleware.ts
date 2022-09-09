import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"
import "dotenv/config"
import AppDataSource from "../data-source"
import { Writer } from "../entities/writer.entities"

const writerIsHimselfMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const writerRepository = AppDataSource.getRepository(Writer)
    const listWriters = await writerRepository.find()

    const writer = listWriters.find(
        (writer) => writer.user.id === req.user.userId
    )

    if (writer?.id !== req.params.id && !req.user.isAdm) {
        throw new AppError(401, "Unauthorized")
    }

    next()
}

export default writerIsHimselfMiddleware
