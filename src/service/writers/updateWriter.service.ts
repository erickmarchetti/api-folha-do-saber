import AppDataSource from "../../data-source"
import { Writer } from "../../entities/writer.entities"
import { AppError } from "../../errors/appError"

const updateWriterService = async (
    id: string,
    bio?: string,
    profileImage?: string
) => {
    const writerRepository = AppDataSource.getRepository(Writer)

    const writer = await writerRepository.findOneBy({ id: id })

    if (!writer) {
        throw new AppError(404, "Writer not found")
    }

    await writerRepository.update(writer!.id, {
        bio,
        profileImage
    })

    const updatedWriter = await writerRepository.findOneBy({ id: id })

    return updatedWriter
}

export default updateWriterService
