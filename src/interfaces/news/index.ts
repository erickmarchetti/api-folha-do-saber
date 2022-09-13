export interface INewsRequest {
    title: string
    subtitle: string
    urlImage: string
    category: string
    body: string
    createdAt?: string
}

export interface INews {
    id: string
    title: string
    subtitle: string
    urlImage: string
    category: string
    body: string
    createdAt: string
    updatedAt: string
}
export interface ICategory {
    id: string
    name: string
}
