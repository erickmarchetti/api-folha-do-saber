import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import listNewsByCategoryService from "../../services/news/listNewsByCategory.service"

const listNewsByCategoryController = async (req: Request, res: Response) => {
    const { categoryName } = req.params

    const newsList = await listNewsByCategoryService(categoryName)
    return res.status(200).json(instanceToPlain(newsList))
}

export default listNewsByCategoryController
