import AppDataSource from "../data-source"
import { News } from "../entities/news.entities"
import { Users } from "../entities/users.entities"
import { Writer } from "../entities/writer.entities"
import { AppError } from "../errors/appError"

const listNewsByWriterService = async (writerId: string) => {
    const writersRepository = AppDataSource.getRepository(Writer)
    const writer = await writersRepository.findOneBy({ id: writerId })

    if (!writer) {
        throw new AppError(404, "Writer not found.")
    }

    // const userRepository = AppDataSource.getRepository(Users)
    // const user = userRepository.findOneBy({writer.user})

    const newsRepository = AppDataSource.getRepository(News)
    const newsList = await newsRepository.find({})

    return writer.user
}
export default listNewsByWriterService
