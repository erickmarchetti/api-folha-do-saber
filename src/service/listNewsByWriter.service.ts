import AppDataSource from "../data-source"
import { News } from "../entities/news.entities"
import { Writer } from "../entities/writer.entities"
import { AppError } from "../errors/appError"

const listNewsByWriterService = async (writerId: string) => {
    const writersRepository = AppDataSource.getRepository(Writer)
    const writer = await writersRepository.findOneBy({ id: writerId })

    if (!writer) {
        throw new AppError(404, "Writer not found.")
    }

    const newsRepository = AppDataSource.getRepository(News)
    const newsList = newsRepository.find({ where: { writer } })

    return newsList
}
export default listNewsByWriterService
