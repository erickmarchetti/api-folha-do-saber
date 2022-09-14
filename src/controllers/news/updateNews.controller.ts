import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import updateNewsService from "../../services/news/updateNews.service"

const updateNewsController = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, subtitle, urlImage, body } = req.body

    const updatedNews = await updateNewsService(
        id,
        title,
        subtitle,
        urlImage,
        body
    )

    return res.status(200).json(instanceToPlain(updatedNews))
}

export default updateNewsController
