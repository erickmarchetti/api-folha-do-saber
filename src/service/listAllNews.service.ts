import AppDataSource from "../data-source"
import { News } from "../entities/news.entities"

const listAllNewsService = async () => {
    const newsRepository = AppDataSource.getRepository(News)
    const allNews = await newsRepository.find()

    return allNews
}
export default listAllNewsService
