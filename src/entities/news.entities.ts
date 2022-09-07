import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from "typeorm"
import { v4 as uuid } from "uuid"
import { Categories } from "./categories.entities"
import { Comments } from "./comments.entities"
import { Writer } from "./writer.entities"

@Entity("news")
export class News {
    @PrimaryColumn("uuid")
    readonly id: string

    @ManyToOne((type) => Writer, (writer) => writer.news, { eager: true })
    @JoinColumn({ name: "writerId" })
    writer: Writer

    @ManyToOne((type) => Categories, (category) => category.news, {
        eager: true
    })
    @JoinColumn({ name: "categoryId" })
    category: Categories

    @Column({ length: 100 })
    title: string

    @Column({ length: 100 })
    subtitle: string

    @Column({ nullable: true })
    urlImage: string

    @Column({ length: 1000 })
    body: string

    @Column()
    createdAt: Date = new Date()

    @Column()
    updatedAt: Date = new Date()

    @OneToOne((type) => News)
    news: News

    @OneToMany((type) => Comments, (comments) => comments.news)
    comments: Comments[]

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
