import { getRepository, Like, Repository, EntityRepository } from "typeorm";
import CreateRepositoriesDTO from "../dtos/CreateRepositoriesDTO";
import IRepositoriesRepository from "../dtos/interfaceRepositories/IRepositories";
import Repositories from "../models/Repository";

@EntityRepository(Repositories)
class RepositoriesRepository extends Repository<Repositories> {

  async findRepository(slug: string): Promise<Repositories> {
    const repository = await this.findOne({
        where: {
          slug,
        },
      });
  
      return repository;
  }

  async findRepositoryByUsername(username: string): Promise<Repositories[]> {
    return await this.find({ where: { slug: Like(`%${username}%`) },}); 
  }

  async findById(id: string): Promise<Repositories> {
    return await this.findOne(id);
}

  async countUsername(username: string): Promise<number> {
     return await this.count({
        where: {
          slug: Like(`%${username}%`),
        },
      });
  }
}

export default RepositoriesRepository;