import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Comments } from "./comments.entities"
import { Writer } from "./writer.entities"
import { Exclude } from "class-transformer"

@Entity("users")
export class Users {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    isAdm: boolean = false

    @Column()
    isWriter: boolean = false

    @Column()
    createdAt: Date = new Date()

    @Column()
    updatedAt: Date = new Date()

    @OneToOne((type) => Writer)
    writer: Writer

    @OneToMany((type) => Comments, (comments) => comments.user)
    comments: Comments[]

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
