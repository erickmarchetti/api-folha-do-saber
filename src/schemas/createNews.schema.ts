import * as yup from "yup"
import { SchemaOf } from "yup"
import { INewsRequest } from "../interfaces/news"

export const createNewsSchema: SchemaOf<INewsRequest> = yup.object().shape({
    title: yup.string().required("title is required"),
    body: yup.string().required("body is required"),
    category: yup.string().required("category is required"),
    subtitle: yup.string().required("subtitle is required"),
    urlImage: yup.string().required("urlImage is required"),
    createdAt: yup.string()
})
