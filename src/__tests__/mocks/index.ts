import { IUserLogin, IUserRequest } from "../../interfaces/users"

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
