import * as yup from "yup"
import { SchemaOf } from "yup"
import { IWriterRequest } from "../interfaces/users"

export const createWriterSchema: SchemaOf<IWriterRequest> = yup.object().shape({
    userId: yup.string().required("userId is required"),
    bio: yup.string().required("bio is required"),
    profileImage: yup.string().required("profileImage is required")
})
