import { INewsRequest } from "../../interfaces/news"
import { IUserLogin, IUserRequest, IWriterCreate } from "../../interfaces/users"

export const mockedUser: IUserRequest = {
    email: "erick@gmail.com",
    name: "Erick",
    password: "1234"
}

export const mockedUserLogin: IUserLogin = {
    email: "erick@gmail.com",
    password: "1234"
}

export const mockedAdm: IUserRequest = {
    email: "adm@gmail.com",
    name: "adm",
    password: "senha"
}

export const mockedAdmLogin: IUserLogin = {
    email: "adm@gmail.com",
    password: "senha"
}

export const mockedWriter: IWriterCreate = {
    bio: "amo escrever testes",
    profileImage: "image url",
    userId: ""
}

export const mockedNews: INewsRequest = {
    writerId: "",
    title: "Lagarta come folha",
    subtitle: "Crise afeta lagarta",
    urlImage: "image.png",
    categoryId: "Curiosidades",
    body: "Lagarta em crise comeu muitas folhas. Estava ansiosa."
}
