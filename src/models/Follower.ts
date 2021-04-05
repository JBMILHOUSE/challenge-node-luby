import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

@Entity("followers")
class Follower {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    user_id: string;


    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User;

    @Column()
    follower_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "follower_id" })
    follower: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Follower };