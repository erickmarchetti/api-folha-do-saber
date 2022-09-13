import AppDataSource from "../../data-source"
import { Writer } from "../../entities/writer.entities"

const listWritersService = async () => {
    const writersRepository = AppDataSource.getRepository(Writer)
    const writersList = await writersRepository.find()

    return writersList
}
export default listWritersService
