import { Request, Response } from "express"
import { container } from "tsyringe";
import { getCustomRepository, } from "typeorm";

import UsersRepository from "../repositories/UsersRepository";
import DeleteUser from "../service/Users/DeleteUser";

class UserController {
   async create(request: Request, response: Response){
        try {

            const userRepo = getCustomRepository(UsersRepository);
            const { name, email, location, avatar, username, bio } = request.body;
           
            const checkEmailExists = await userRepo.findByEmail(email);

            if(checkEmailExists){
                return response.status(404).json({ message: "email already exists"});
            }

            const checkUsername = await userRepo.findByUsername(username);

            if(checkUsername){
                return response.json("username already existing");
            }

            const createUser = userRepo.create({ name, email, location, avatar, username, bio });

            await userRepo.save(createUser);

            return response.status(201).json(createUser);

        } catch (error) {
            return response.status(404).json(error);
        }
    }

    async index(request: Request, response: Response){
        try {
            const user_id = request.params;
            const showUser = getCustomRepository(UsersRepository);
            
            const user = await showUser.find(user_id)

            if(!user){
                response.json("usuario não existe");
            }

            return response.status(201).json(user);
        } catch (error) {
            return response.json(error)
        }
    }

    // erro ao atualizar
    async update(request: Request, response: Response){
        try {

            const user_id = request.params.id;
            const { name, email, location, avatar, username, bio } = request.body;

            const userRepo = getCustomRepository(UsersRepository);
            const user = await userRepo.findById(user_id);

            //console.log(user);
            if(!user){
                return response.json({ error: "user not found!"});
            }
            
            console.log(await userRepo.save({ user_id: user.id, name: user.name, email: user.email,
                 location: user.location, avatar: user.avatar, username: user.username, bio: user.bio}));
            
           // return response.status(201).json(createUser);
        }
        catch(error) {
            console.log(error);
        }
    }

    async destroy(request: Request, response: Response): Promise<Response>{
        try{
            const user_id= request.params.id;
            const userRepo = getCustomRepository(UsersRepository);
            const user = await userRepo.findById(user_id);

            if (!user) {
               return response.json("user don't existing");
            }
            
            await userRepo.delete(user_id);
            return response.json({ message: "user successfully deleted"});
        }
        catch(err){
            return response.json(err);
        }
    }
}

export default UserController;