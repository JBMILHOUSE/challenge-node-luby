import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import User from "../models/User";

import RepositoriesRepository from "../repositories/RepositoriesRepository";
import UsersRepository from "../repositories/UsersRepository";

interface UserDTO{
  username: User;
}

class RepositoriesController {
    async create(request: Request, response: Response){
      try {
        
          const { name, description, username, open } = request.body;

          const userRepository = getCustomRepository(UsersRepository);
          const repositoriesRepository = getCustomRepository(RepositoriesRepository);

          const isUser = await userRepository.findByUsername(username);

          if (!isUser) {
            return response.json('not found user from provided username');
          }
      
          const slugName = `${isUser.username.split(' ').join('')}/${name
            .split(' ')
            .join('-')}`;
      
          const checkSlug = await repositoriesRepository.findRepository(
            slugName,
          );
      
          if (checkSlug) {
            return response.json('repository already existing');
          }

          const isRepositories = repositoriesRepository.create({ name, description, open, slug: slugName});

          await repositoriesRepository.save(isRepositories);

          return response.status(201).json(isRepositories);
      
      } catch (error) {
          console.log(error);
      }
    }

    async index(request: Request, response: Response){
     try {
       const {user_id} = request.params;
       const { username } = request.body;

       const userRepository = getCustomRepository(UsersRepository);
       const repositoriesRepository = getCustomRepository(RepositoriesRepository);

       const user = await userRepository.findById(user_id);

       if (user) {
         return response.json('error');
       }
   
       const nameUsers = `${user.username.split(' ').join('')}`;
        console.log(user) // TypeError: Cannot read property 'username' of undefined
       const repositories = await repositoriesRepository.findRepositoryByUsername(
         user.username = nameUsers,
       );
       
       if (!repositories) {
         return response.json('did not find any repository');
       }
   
       const count = await repositoriesRepository.countUsername(user.username);
   
       if (!count) {
        return response.json('not found');
       }
   
       console.log(repositories, count);
     } catch (error) {
      console.log(error);
     }
    }

    async update(request: Request, response: Response){
      try {
        const repository_id = request.params.id;
        const { name, description, open } = request.body;
  
        const repositoriesRepository = getCustomRepository(RepositoriesRepository);

        const checkRepo = await repositoriesRepository.findById(repository_id);

        if (!checkRepo) {
          return response.json('repository not found');
        }
    
        const splitSlug = checkRepo.slug.split('/');
        const newSlug = splitSlug[1].replace(splitSlug[1], name);
        const slugName = `${splitSlug[0]}/${newSlug.split(' ').join('-')}`;
    
        const checkSlug = await repositoriesRepository.findRepository(
          checkRepo.slug = slugName,
        );
    
        if (checkSlug) {
          return response.json('repository already existing');
        }

        //console.log(checkRepo, checkSlug);
       await repositoriesRepository.save({  name: checkRepo.name, description: checkRepo.description, open: checkRepo.open });

       // await repositoriesRepository.save(repositoriesUpdate);

        //console.log(repositoriesUpdate);
      } catch (error) {
        console.log(error);
      }
     
    }

    async destroy(request: Request, response: Response){
      try {
        const repository_id = request.params.id;
        const repositoriesRepository = getCustomRepository(RepositoriesRepository);
        const repositories = await repositoriesRepository.findById(repository_id);

        if (!repositories) {
         return response.json('repository not existing');
        }
         
        await repositoriesRepository.delete(repository_id);

        return response.json({ message: "success for delete repository"});
      } catch (error) {
        return response.json(error);
      }

    }

}

export default RepositoriesController;