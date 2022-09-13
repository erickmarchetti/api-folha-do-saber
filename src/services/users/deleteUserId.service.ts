import { Users } from "../../entities/users.entities"
import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError"

const userDeleteService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Users)
    const userDeleted = await userRepository.findOneBy({ id: id })
    if (!userDeleted) {
        throw new AppError(404, "User not found.")
    }
    if (userDeleted.isAdm !== true && userDeleted.id !== id) {
        throw new AppError(401, "Invalid token.")
    }
    await userRepository.save(userDeleted)

    return "Deleted user."
}
export default userDeleteService
