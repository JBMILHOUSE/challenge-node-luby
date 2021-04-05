import RepositoriesStars from "../../models/RepositorieStarts";
import CreateRepositoriesStarsDTO from "../CreateRepositoriesStarsDTO";


export default interface IRepositoriesStarsRepository {
    findById(repositories_stars_id: string): Promise<RepositoriesStars | undefined>;
    findByRepoId(
      repositories_stars_id: string,
    ): Promise<RepositoriesStars | undefined>;
    findRepoStar(
      user_id, repository_id: CreateRepositoriesStarsDTO,
    ): Promise<RepositoriesStars | undefined>;
    findStar(repository_id: string): Promise<number | undefined>;
    create(data: CreateRepositoriesStarsDTO): Promise<RepositoriesStars>;
    save(repositoryStar: RepositoriesStars): Promise<RepositoriesStars>;
    delete(repositories_stars_id: string): Promise<void>;
}