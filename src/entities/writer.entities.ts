import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from "typeorm"
import { v4 as uuid } from "uuid"
import { News } from "./news.entities"
import { Users } from "./users.entities"

@Entity("writer")
export class Writer {
    @PrimaryColumn("uuid")
    readonly id: string

    @OneToOne((type) => Users, (user) => user.writer, {
        eager: true,
        nullable: false,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user: Users

    @Column()
    bio: string

    @Column()
    profileImage: string =
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"

    @OneToMany((type) => News, (news) => news.writer)
    news: News[]

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
