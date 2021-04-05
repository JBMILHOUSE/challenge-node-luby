import { EntityRepository, getRepository, Repository } from "typeorm";
import CreateRepositoriesStarsDTO from "../dtos/CreateRepositoriesStarsDTO";
import IRepositoriesStarsRepository from "../dtos/interfaceRepositories/IRepositoriesRepository";
import RepositoriesStars from "../models/RepositorieStarts";


@EntityRepository(RepositoriesStars)
class RepositoriesStarsRepository extends Repository<RepositoriesStars> {

    async findRepoStar({ user_id, repository_id }: CreateRepositoriesStarsDTO): Promise<RepositoriesStars> {
        return await this.findOne({
            where: { user_id, repository_id },
          });
    }

    async findById(repositories_stars_id: string): Promise<RepositoriesStars> {
      return await this.findOne({
            where: {
              repository_id: repositories_stars_id,
            },
          });
    }

    async findStar(repository_id: string): Promise<number> {
       return await this.count({
            where: {
              repository_id,
            },
          });
    }

    async deleteStar(repositories_stars_id: string): Promise<void> {
        await this.delete({ id: repositories_stars_id });
    }

   /* private ormRepository:  Repository<RepositoriesStars>;
 
    constructor() {
       this.ormRepository = getRepository(RepositoriesStars);
    }
     


    async findByRepoId(repositories_stars_id: string): Promise<RepositoriesStars> {
        const star = this.ormRepository.findOne(repositories_stars_id);

        return star;
    }

  

  

    async create(data: CreateRepositoriesStarsDTO): Promise<RepositoriesStars> {
        const repoStars = this.ormRepository.create(data);

        await this.ormRepository.save(repoStars);
    
        return repoStars;
    }

    async save(repositoryStar: RepositoriesStars): Promise<RepositoriesStars> {
        return this.ormRepository.save(repositoryStar);
    }

   */
}

export default RepositoriesStarsRepository;