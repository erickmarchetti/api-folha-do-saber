export interface IUserRequest {
    name: string
    email: string
    password: string
}

export interface IUserPatchRequest {
    id: string
    name?: string
    email?: string
    password?: string
    isAdm?: boolean
    isWriter?: boolean
}

export interface IUser {
    id: string
    name: string
    email: string
    password: string
    isAdm: boolean
    isWriter: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IWriter {
    id: string
    userData: IUser
    bio: string
    profileImage: string
}

export interface IWriterRequest {
    userId: string
    bio: string
    profileImage: string
}

export interface IUserLogin {
    email: string
    password: string
}

export interface ResponseLogin {
    body: {
        id: string
        token: string
    }
}
