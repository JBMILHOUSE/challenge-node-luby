import Repositories from "../../models/Repository";
import CreateRepositoryDTO from "../CreateRepositoriesDTO";


export default interface IRepositoriesRepository{
    findById(id: string): Promise<Repositories | undefined>;
    findRepositories(slug: string): Promise<Repositories [] | undefined>;
    findRepository(slug: string): Promise<Repositories  | undefined>;
    findRepositoryByUsername(username: string): Promise<Repositories [] | undefined>;
    create(data: CreateRepositoryDTO): Promise<Repositories >;
    delete(repository_id: string): Promise<void>;
    save(repository: Repositories): Promise<Repositories>;
    count(slug: string): Promise<number| undefined>;
}