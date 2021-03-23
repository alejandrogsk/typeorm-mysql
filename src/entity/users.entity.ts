import {Entity, Unique, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {TodoEntity} from './todos.entity';

@Entity()
@Unique(["email"])
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany('TodoEntity', (todo: TodoEntity) => todo.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    todo: TodoEntity[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;


}