import * as yup from "yup"
import { SchemaOf } from "yup"
import { IUserRequest } from "../interfaces/users"

export const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup.string().required("password is required")
})
