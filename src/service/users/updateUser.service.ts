import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entities"
import bcrypt from "bcryptjs"
import { AppError } from "../../errors/appError"
import { IUserPatchRequest } from "../../interfaces/users"

interface updateUserReqInfos {
    isAdm: boolean
    userId: string
    isWriter: boolean
}

const updateUserService = async (
    patchRequest: IUserPatchRequest,
    reqInfos: updateUserReqInfos
) => {
    const userRepository = AppDataSource.getRepository(Users)
    const user = await userRepository.findOne({
        where: { id: patchRequest.id },
        relations: { writer: true }
    })

    if ((patchRequest.isAdm || patchRequest.isWriter) && !reqInfos.isAdm) {
        throw new AppError(401, "Admin permission is required")
    }

    if (patchRequest.isWriter && !user!.writer) {
        throw new AppError(401, "User is not a writer")
    }

    if (patchRequest.password) {
        if (bcrypt.compareSync(patchRequest.password, user!.password)) {
            throw new AppError(409, "Inform a different password.")
        }
    }

    await userRepository.update(user!.id, {
        name: patchRequest.name !== undefined ? patchRequest.name : user!.name,
        email:
            patchRequest.email !== undefined ? patchRequest.email : user!.email,
        password:
            patchRequest.password !== undefined
                ? bcrypt.hashSync(patchRequest.password, 10)
                : user!.password,
        isAdm:
            patchRequest.isAdm !== undefined ? patchRequest.isAdm : user!.isAdm,
        isWriter:
            patchRequest.isWriter !== undefined
                ? patchRequest.isWriter
                : user!.isWriter
    })

    const updatedUser = userRepository
        .createQueryBuilder("users")
        .innerJoinAndSelect("users.writer", "writer")
        .where("users.id = :id", { id: patchRequest.id })
        .getMany()

    return updatedUser
}
export default updateUserService
