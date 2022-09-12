import AppDataSource from "../data-source"
import { Categories } from "../entities/categories.entities"
import { News } from "../entities/news.entities"
import { Writer } from "../entities/writer.entities"
import { AppError } from "../errors/appError"
import { INewsCreate } from "../interfaces/news"

const createNewsService = async (
    writerId: string,
    { title, subtitle, urlImage, categoryId, body, createdAt }: INewsCreate
) => {
    const newsRepository = AppDataSource.getRepository(News)
    const newsAlreadyExists = await newsRepository.findOneBy({ title })

    if (newsAlreadyExists) {
        throw new AppError(400, "This news already exists.")
    }

    const writerRepository = AppDataSource.getRepository(Writer)
    const writer = await writerRepository.findOneBy({ id: writerId })

    if (!writer) {
        throw new AppError(404, "Writer not found.")
    }

    const categoryRepository = AppDataSource.getRepository(Categories)
    const category = await categoryRepository.findOneBy({ id: categoryId })

    if (!category) {
        throw new AppError(404, "Category not found.")
    }

    const news = new News()
    news.writer = writer
    news.category = category
    news.title = title
    news.subtitle = subtitle
    news.urlImage = urlImage
    news.body = body
    news.createdAt = createdAt ? new Date(createdAt) : new Date()
    news.updatedAt = new Date()

    const newNews = await newsRepository.save(news)

    return newNews
}
export default createNewsService
