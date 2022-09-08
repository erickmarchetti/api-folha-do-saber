import AppDataSource from "../data-source"
import { Categories } from "../entities/categories.entities"
import { News } from "../entities/news.entities"
import { AppError } from "../errors/appError"

const listNewsByCategoryService = async (categoryId: string) => {
    const categoriesRepository = AppDataSource.getRepository(Categories)
    const category = await categoriesRepository.findOneBy({ id: categoryId })

    if (!category) {
        throw new AppError(404, "Category not found.")
    }

    const newsRepository = AppDataSource.getRepository(News)
    const newsList = await newsRepository.find({ where: { category } })

    return newsList
}
export default listNewsByCategoryService
