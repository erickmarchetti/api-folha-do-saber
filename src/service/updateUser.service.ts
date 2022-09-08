import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import bcrypt from "bcryptjs"
import { AppError } from "../errors/appError"

const updateUserService = async (
    name?: string,
    email?: string,
    password?: string
) => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()

    const account = users.find((user) => user.email === email)

    if (password) {
        if (bcrypt.compareSync(password, account!.password)) {
            throw new AppError(409, "Inform a different password.")
        }
    }
    const newPassword = password && bcrypt.hashSync(password, 10)
    const userUpdate = { name, email, newPassword }
    return await userRepository.update(account!.id, userUpdate)
}
export default updateUserService
