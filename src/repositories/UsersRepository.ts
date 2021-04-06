import { EntityRepository, getRepository, Repository } from "typeorm";
import CreateUserDTO from "../dtos/CreateUserDTO";
import IUserRepository from "../dtos/interfaceRepositories/IUserRepository";
import User from "../models/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {

  public async findByEmail(email: string): Promise<User>{
     return this.findOne({ where: { email }});
  }

  public async findById(id: string): Promise<User>{
    return this.findOne({ where: { id }});
  }

  public async findByUsername(username: string): Promise<User>{
    return this.findOne({ where: { username }});
  }
}

export default UsersRepository;