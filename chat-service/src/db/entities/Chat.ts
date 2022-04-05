import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("chats")
export default class Chat {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  username: string;
}