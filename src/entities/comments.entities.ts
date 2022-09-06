import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { News } from "./news.entities"
import { Users } from "./users.entities"

@Entity("comments")
export class Comments {
    @PrimaryColumn("uuid")
    readonly id: string

    @ManyToOne((type) => Users, (user) => user.comments, { eager: true })
    @JoinColumn({ name: "userId" })
    user: Users

    @ManyToOne((type) => News, (news) => news.comments)
    news: News

    @Column()
    comment: string

    @Column()
    createdAt: Date = new Date()

    @Column()
    updatedAt: Date = new Date()

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
