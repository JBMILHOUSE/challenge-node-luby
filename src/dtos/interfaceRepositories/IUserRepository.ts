import { User } from "../../models/User";
import CreateUserDTO from "../CreateUserDTO";

export default interface IUserRepository{
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;
    create(data: CreateUserDTO): Promise<User | undefined>;
    save(user: User): Promise<User | undefined>;
    delete(email: string): Promise<void>;
}