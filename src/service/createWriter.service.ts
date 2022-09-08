import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import { Writer } from "../entities/writer.entities"
import { AppError } from "../errors/appError"
import { IWriterCreate } from "../interfaces/users"

const createWriterService = async ({
    userId,
    bio,
    profileImage
}: IWriterCreate) => {
    const userRepository = AppDataSource.getRepository(Users)
    const user = await userRepository.findOneBy({ id: userId })

    if (!user) {
        throw new AppError(404, "User not found.")
    }

    const writerRepository = AppDataSource.getRepository(Writer)
    const writerAlreadyExists = await writerRepository.findOneBy({ user })

    if (writerAlreadyExists) {
        throw new AppError(400, "This user is already a writer.")
    }

    const newWriter = await writerRepository.save({
        user,
        bio,
        profileImage
    })

    return newWriter
}
export default createWriterService
