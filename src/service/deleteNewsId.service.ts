import AppDataSource from "../data-source"
import { News } from "../entities/news.entities"
import { AppError } from "../errors/appError"

const deleteNewsIdService = async (id: string) => {
    const newsRepository = AppDataSource.getRepository(News)
    const news = await newsRepository.findOneBy({ id: id })

    if (!news) {
        throw new AppError(404, "New not found")
    }
    await newsRepository.delete(news!.id)
    return "Notice deleted"
}
export default deleteNewsIdService
