import * as yup from "yup"
import { SchemaOf } from "yup"
import { IUserLogin } from "../interfaces/users"

export const postLoginSchema: SchemaOf<IUserLogin> = yup.object().shape({
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required")
})
