import AppDataSource from "../data-source"
import { News } from "../entities/news.entities"
import { AppError } from "../errors/appError"

const listNewsIdService = async (id: string) => {
    const newsRepository = AppDataSource.getRepository(News)
    const news = await newsRepository.find()
    const newsExist = news.find((news) => news.id === id)

    if (!newsExist) {
        throw new AppError(400, "News not found")
    }

    return newsExist
}
export default listNewsIdService
