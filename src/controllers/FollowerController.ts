import { Request, Response } from "express";
import { container } from "tsyringe";
import { getCustomRepository } from "typeorm";
import AppError from "../error/AppError";

import FollowerRepository from "../repositories/FollowerRepository";
import UsersRepository from "../repositories/UsersRepository";

class FollowerController {
    async create(request: Request, response: Response){
        try {
            const { follower_id, user_id } = request.body;

            const userRepo = getCustomRepository(UsersRepository);
            const followerRepo = getCustomRepository(FollowerRepository);
    
            const user = await userRepo.findById(user_id);
            const follower = await userRepo.findById(follower_id);

            if(!user || !follower){
                throw new AppError("past ids do not match");
            }

            const checkUserFollowerMatch = await followerRepo.findFollower({
                user_id,
                follower_id,
            });
     
            if (checkUserFollowerMatch) {
                throw new AppError('relationship already exists');
            }
          
            if (user_id === follower_id) {
                throw new AppError("you can't follow yourself");
            }

            const createFollower = followerRepo.create({
                follower_id: follower_id,
                user_id: user_id,
            });
            
            await followerRepo.save(createFollower);

            //console.log(createFollower);
           return response.status(201).json(createFollower);
        } catch (error) {
           throw new AppError(error); 
        }
    }

    async index(request: Request, response: Response){
        try {
            const user_id = request.params;
            const followerRepo = getCustomRepository(FollowerRepository);

            const follower = await followerRepo.find(user_id);

            if(!follower){
                return response.json('no followers found');
            }

            const count = await followerRepo.count(user_id);

            if (!count) {
                return response.json('not count followers');
            }

            //console.log(follower, count);
            return response.status(201).json({ follower, count });
        } catch (error) {
            throw new AppError(error);
        }
    }
}

export default FollowerController;