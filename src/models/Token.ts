import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("tokens")
class Token {

  @PrimaryColumn()
  readonly id: string;
  
  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id"})
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export { Token };