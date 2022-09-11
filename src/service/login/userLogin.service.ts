import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError"
import { Users } from "../../entities/users.entities"
import { IUserLogin } from "../../interfaces/users"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"

const userLoginService = async ({ email, password }: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()

    const userLogin = users.find((user) => user.email === email)

    if (!userLogin) {
        throw new AppError(403, "Invalid credentials")
    }

    const comparePassword = bcrypt.compareSync(password, userLogin.password)

    if (!comparePassword) {
        throw new AppError(403, "Invalid credentials")
    }

    const token = jwt.sign(
        {
            isAdm: userLogin.isAdm,
            isWriter: userLogin.isWriter,
            userId: userLogin.id
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "24h" }
    )

    return { id: userLogin.id, token }
}

export default userLoginService
