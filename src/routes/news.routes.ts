import { Router } from "express"
import listNewsByCategoryController from "../controller/listNewsByCategory.controller"

const newsRouter = Router()

newsRouter.get("/:id/categories", listNewsByCategoryController)

export default newsRouter
