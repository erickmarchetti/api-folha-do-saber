import AppDataSource from "../../data-source"
import { News } from "../../entities/news.entities"
import { AppError } from "../../errors/appError"
import { INews } from "../../interfaces/news"

const updateNewsService = async (
    id: string,
    title: string,
    subtitle: string,
    urlImage: string,
    body: string
) => {
    const newsRepository = AppDataSource.getRepository(News)
    const news = await newsRepository.findOneBy({ id: id })

    if (!news) {
        throw new AppError(404, "News not found")
    }

    await newsRepository.update(news!.id, {
        title,
        subtitle,
        urlImage,
        body
    })

    return true
}

export default updateNewsService
