import { Request, Response } from "express";
import { container } from "tsyringe";
import { getCustomRepository } from "typeorm";
import AppError from "../error/AppError";

import FollowingRepository from "../repositories/FollowingRepository";
import UsersRepository from "../repositories/UsersRepository";

import CreateFollowing from "../service/Following/CreateFollowing";
import ShowAllFollowing from "../service/Following/ShowAllFollowing";

class FollowingController {
    async create(request: Request, response: Response){
        try {
            const { user_id, following_id } = request.body;

            const userRepo = getCustomRepository(UsersRepository);
            const followingRepo = getCustomRepository(FollowingRepository);
            
            const user = await userRepo.findById(user_id);
            const following = await userRepo.findById(following_id);
      
            if (!user || !following) {
              return response.json('past ids do not match');
            }
      
            const checkUserFollowerMatch = await followingRepo.findFollowing({ user_id, following_id,});
        
  
            if (checkUserFollowerMatch) {
              return response.json('relationship already exists');
            }
        
            if (user_id === following_id) {
              return response.json("you can't following yourself");
            }
            console.log(checkUserFollowerMatch);

            const createFollowing = followingRepo.create({ following_id: following_id, user_id: user_id, });
        
            await followingRepo.save(createFollowing);

            //console.log(createFollowing);
           
           return response.status(201).json(createFollowing);
          } catch (err) {
            //console.log(err);
            return response.status(404).json(err);
        }
    }
   
    async index(request: Request, response: Response): Promise<Response> {
        try {
          const user_id = request.params;
          const followingRepo = getCustomRepository(FollowingRepository);
    
          const following = await followingRepo.find(user_id);

          if (!following) {
            throw new AppError('no followings found');
          }
      
          const count = await followingRepo.count(user_id);
      
          if (!count) {
            throw new AppError('not count followings');
          }
    
          //console.log(following, count);
          return response.status(201).json({ following, count });

        } catch (err) {
          console.log(err);
        }
      }
}

export default FollowingController;