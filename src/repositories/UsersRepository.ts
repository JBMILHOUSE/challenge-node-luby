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
  /* private userRepository:  Repository<User>;

    constructor() {
      this.userRepository = getRepository(User);
    }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userEmail = this.userRepository.findOne({ where: email });

    return userEmail;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const userUsername = this.userRepository.findOne({ where: username });

    return userUsername;
  }
  
  public async create(data: CreateUserDTO): Promise<User> {
    const createUser = this.userRepository.create(data);
    
    await this.userRepository.save(createUser);

    return createUser;
  }

  public async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  
  public async delete(email: string): Promise<void> {
    await this.userRepository.delete({ email });
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = this.userRepository.findOne(id);

    return user;
  }*/
}

export default UsersRepository;