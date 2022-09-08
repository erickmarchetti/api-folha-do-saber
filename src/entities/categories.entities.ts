import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { News } from "./news.entities"

@Entity("categories")
export class Categories {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column({ unique: true, length: 50 })
    name: string

    @OneToMany((type) => News, (news) => news.category)
    news: News[]

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
