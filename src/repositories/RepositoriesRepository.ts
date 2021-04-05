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


  /*async create(data: CreateRepositoriesDTO): Promise<Repositories> {
  const repository = this.create(data);

  await this.save(repository);

  return repository;
  }
  *private ormRepository:  Repository<Repositories>;
 
     constructor() {
       this.ormRepository = getRepository(Repositories);
     }

  

    async findRepositories(slug: string): Promise<Repositories[] | undefined> {
        const repositories = await this.ormRepository.find({
            where: {
              slug,
            },
          });
      
          return repositories;
    }



   

   

    async delete(repository_id: string): Promise<void> {
        await this.ormRepository.delete({ id: repository_id });
    }

    async save(repository: Repositories): Promise<Repositories> {
        return this.ormRepository.save(repository);
    }

    */
}

export default RepositoriesRepository;