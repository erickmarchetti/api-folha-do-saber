import { INewsRequest } from "../../interfaces/news"
import {
    IUserLogin,
    IUserRequest,
    IWriterRequest
} from "../../interfaces/users"

export const mockedUser: IUserRequest = {
    email: "erick@gmail.com",
    name: "Erick",
    password: "1234Aa!"
}
export const mockedUserLogin: IUserLogin = {
    email: "erick@gmail.com",
    password: "1234Aa!"
}
export const mockedAdm: IUserRequest = {
    email: "adm@gmail.com",
    name: "adm",
    password: "1234Aa!"
}
export const mockedAdmLogin: IUserLogin = {
    email: "adm@gmail.com",
    password: "1234Aa!"
}
export const mockedWriter: IWriterRequest = {
    bio: "amo escrever testes",
    profileImage: "image url",
    userId: ""
}

export const mockedNews: INewsRequest = {
    title: "Lagarta come folha",
    subtitle: "Crise afeta lagarta",
    urlImage: "image.png",
    category: "Curiosidades",
    body: "Lagarta em crise comeu muitas folhas. Estava ansiosa."
}
