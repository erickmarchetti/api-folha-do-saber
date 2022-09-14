import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entities"

const listUserIdService = async () => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()

    return users
}
export default listUserIdService
