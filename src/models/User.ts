import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column()
  avatar: string;

  @Column()
  username: string;

  @Column()
  bio: string;

  @CreateDateColumn({ name: "create_at"})
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;