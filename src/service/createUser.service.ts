import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import { IUserRequest } from "../interfaces/users"
import { hash } from "bcryptjs"

const createUserService = async ({ name, email, password }: IUserRequest) => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()

    const hashedPassword = await hash(password, 10)

    const newUser = new Users()
    newUser.name = name
    newUser.email = email
    newUser.password = hashedPassword

    if (users.length == 0) {
        newUser.isAdm = true
    }

    userRepository.create(newUser)

    await userRepository.save(newUser)

    return newUser
}

export default createUserService
