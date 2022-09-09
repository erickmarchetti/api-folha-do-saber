import { Request, Response } from "express"
import updateNewsService from "../service/updateNews.service"

const updateNewsController = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, subtitle, urlImage, body } = req.body

    await updateNewsService(id, title, subtitle, urlImage, body)

    return res.status(200).json({ message: "News updated" })
}

export default updateNewsController
