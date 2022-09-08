import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import { AppError } from "../errors/appError"

const listUserIdService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()
    const account = users.find((user) => user.id === id)

    if (!account) {
        throw new AppError(404, "User not found.")
    }
    return account
}
export default listUserIdService
