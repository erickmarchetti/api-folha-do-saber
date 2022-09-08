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
