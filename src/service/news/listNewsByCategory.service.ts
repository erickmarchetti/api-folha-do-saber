import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entities"
import { News } from "../../entities/news.entities"
import { AppError } from "../../errors/appError"

const listNewsByCategoryService = async (categoryName: string) => {
    const categoriesRepository = AppDataSource.getRepository(Categories)
    const category = await categoriesRepository.findOneBy({
        name: categoryName
    })
    const newsRepository = AppDataSource.getRepository(News)

    if (category?.name !== categoryName) {
        throw new AppError(404, "Category not found.")
    }

    const newsList = await newsRepository.find({ where: { category } })

    return newsList
}
export default listNewsByCategoryService
