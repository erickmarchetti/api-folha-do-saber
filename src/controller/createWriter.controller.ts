import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import createWriterService from "../service/createWriter.service"

const createWriterController = async (req: Request, res: Response) => {
    const { userId, bio, profileImage } = req.body
    const createWriter = await createWriterService({
        userId,
        bio,
        profileImage
    })
    return res.status(201).json(instanceToPlain(createWriter))
}
export default createWriterController
