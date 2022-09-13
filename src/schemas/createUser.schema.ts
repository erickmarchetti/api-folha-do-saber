import * as yup from "yup"
import { SchemaOf } from "yup"
import { IUserRequest } from "../interfaces/users"

export const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
        .string()
        .required("password is required")
        .matches(
            /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/,
            "Password must contain, at least: one number, one lowercase letter, one uppercase letter, one special character and six characters."
        )
})
