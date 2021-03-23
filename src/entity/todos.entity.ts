import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {UserEntity} from './users.entity';

@Entity()
export class TodoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.todo)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}