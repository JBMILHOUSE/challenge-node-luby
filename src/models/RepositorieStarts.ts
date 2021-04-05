import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Repository from "./Repository";
import User from "./User";


@Entity("repositories_stars")
class RepositoriesStars {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    repository_id: string;

    @ManyToOne(() => Repository)
    @JoinColumn({ name: "repository_id"})
    repository: Repository;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default RepositoriesStars;