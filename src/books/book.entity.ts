import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    nameBook: string

    @Column()
    descriptionBook: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    stock: number

    @Column()
    urlImg: string

    @Column({ default: true })
    active: boolean
}