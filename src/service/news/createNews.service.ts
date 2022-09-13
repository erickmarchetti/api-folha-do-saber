import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entities"
import { News } from "../../entities/news.entities"
import { Users } from "../../entities/users.entities"
import { AppError } from "../../errors/appError"
import { INewsRequest } from "../../interfaces/news"

const createNewsService = async (
    userId: string,
    { title, subtitle, urlImage, category, body, createdAt }: INewsRequest
) => {
    const newsRepository = AppDataSource.getRepository(News)
    const userRepository = AppDataSource.getRepository(Users)
    const categoryRepository = AppDataSource.getRepository(Categories)

    const user = await userRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            writer: true
        }
    })

    if (!user!.writer) {
        throw new AppError(401, "User is not a writer")
    }

    const news = new News()
    news.writer = user!.writer
    news.title = title
    news.subtitle = subtitle
    news.urlImage = urlImage
    news.body = body
    news.createdAt = createdAt ? new Date(createdAt) : new Date()
    news.updatedAt = new Date()

    const verifyCategory = await categoryRepository.findOneBy({
        name: category
    })
    if (!verifyCategory) {
        const categoryCreate = new Categories()

        categoryCreate.name = category

        await categoryRepository.save(categoryCreate)

        news.category = categoryCreate
    } else {
        news.category = verifyCategory
    }

    const newNews = await newsRepository.save(news)

    return newNews
}
export default createNewsService
