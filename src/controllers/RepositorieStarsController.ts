import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import RepositoriesRepository from "../repositories/RepositoriesRepository";
import RepositoriesStarsRepository from "../repositories/RepositoriesStarsRepository";
import UsersRepository from "../repositories/UsersRepository";

class RepositorieStarsController {
    async create(request: Request, response: Response){
        try {
            const user_id = request.params.id;
            const { repository_id } = request.body;
      
            const userRepository = getCustomRepository(UsersRepository);
            const repositoriesRepository = getCustomRepository(RepositoriesRepository);
            const repositoriesStarsRepository = getCustomRepository(RepositoriesStarsRepository);

            const user = await userRepository.findById(user_id);

            if (!user) {
              return response.json('user not found');
            }
        
            const repo = await repositoriesRepository.findById(repository_id);
        
            if (!repo) {
              return response.json('repository not found');
            }
        
            const checkStar = await repositoriesStarsRepository.findRepoStar({
              user_id,
              repository_id,
            });
        
            if (checkStar) {
              return response.json('star this repo already existis');
            }
            
            //console.log(checkStar, repo, user);

            const stars = repositoriesStarsRepository.create({ user_id, repository_id });

            await repositoriesStarsRepository.save(stars);
      
            return response.status(201).json(stars);
          } catch (err) {
            return response.status(201).json(err);
          }

    }

    public async index(request: Request, response: Response): Promise<Response> {
        try {
          const repository_id = request.params.id;
          
          const repositoriesStarsRepository = getCustomRepository(RepositoriesStarsRepository);

          const repoStar = await repositoriesStarsRepository.findOne(repository_id,);
      
          if (repoStar) {
            return response.json('repository not found');
          }
   
          const stars = await repositoriesStarsRepository.findStar(
            repository_id,
          );
      
          if (!stars) {
            return response.json('this repo dont have stars');
          }

          return response.status(201).json({ stars, repoStar});
        } catch (err) {
          return response.status(404).json(err);
        }
    }
     
      
    public async destroy(request: Request, response: Response){
        try {
          const repository_id = request.params.id;
          
          const repositoriesStarsRepository = getCustomRepository(RepositoriesStarsRepository);
          const repoStarsDelete = repositoriesStarsRepository.findById(repository_id);

         await repositoriesStarsRepository.delete(repository_id);

          return response.status(201).json({ message: "success for delete star"});
        } catch (error) {
           return response.status(404).json(error)
        }
    }

}

export default RepositorieStarsController;