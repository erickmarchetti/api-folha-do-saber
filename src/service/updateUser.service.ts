import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import bcrypt from "bcryptjs"
import { AppError } from "../errors/appError"

const updateUserService = async (
    id: string,
    isAdm: boolean,
    isWriter: boolean,
    name?: string,
    email?: string,
    password?: string
) => {
    const userRepository = AppDataSource.getRepository(Users)
    const user = await userRepository.findOneBy({ id: id })

    if (password) {
        if (bcrypt.compareSync(password, user!.password)) {
            throw new AppError(409, "Inform a different password.")
        }
    }

    const newPassword = password && bcrypt.hashSync(password, 10)

    await userRepository.update(user!.id, {
        name,
        email,
        password: newPassword
    })
    return true
}
export default updateUserService
