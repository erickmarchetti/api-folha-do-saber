export interface INewsRequest {
    writerId: string
    title: string
    subtitle: string
    urlImage: string
    categoryId: string
    body: string
    createdAt?: string
}

export interface INews {
    id: string
    writer: string
    title: string
    subtitle: string
    urlImage: string
    categoryId: string
    body: string
    createdAt: string
    updatedAt: string
}

export interface ICategory {
    id: string
    name: string
}
