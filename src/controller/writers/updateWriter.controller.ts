import { Request, Response } from "express"
import updateWriterService from "../../service/writers/updateWriter.service"

const updateWriterController = async (req: Request, res: Response) => {
    const { id } = req.params
    const { bio, profileImage } = req.body

    const updatedWriter = await updateWriterService(id, bio, profileImage)

    return res.status(200).json(updatedWriter)
}

export default updateWriterController
