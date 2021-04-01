import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {

  @PrimaryColumn()
  readonly id: string;
  
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

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export { User };