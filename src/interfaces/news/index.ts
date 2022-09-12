export interface INewsRequest {
    writerId: string
    title: string
    subtitle: string
    urlImage: string
    categoryId: string
    body: string
}

export interface INews {
    title: string
    subtitle: string
    urlImage: string
    categoryId: string
    body: string
    createdAt: string
    updatedAt: string
}

export interface INewsCreate {
    title: string
    subtitle: string
    urlImage: string
    categoryId: string
    body: string
    createdAt?: string
}

export interface ICategory {
    id: string
    name: string
}
