import { Request, Response } from "express"
import { container } from "tsyringe";
import { getCustomRepository, RepositoryNotTreeError } from "typeorm";
import AppError from "../error/AppError";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";
import CreateUserService from "../service/Users/CreateUserService";
import DeleteUser from "../service/Users/DeleteUser";
import ShowUser  from "../service/Users/ShowUser";
import UpdateProfile  from "../service/Users/UpdateProfile";

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
                throw new AppError("username already existing");
            }

            const createUser = userRepo.create({ name, email, location, avatar, username, bio });

            await userRepo.save(createUser);

           /* const createUser = container.resolve(CreateUserService);

            const user = await createUser.execute({ name, email, location, avatar, username, bio})*/

            return response.status(201).json(createUser);

        } catch (error) {
            console.log(error);
            //return response.status(404).json({ error: "erro ao inserir"});
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

            //console.log(user);
            return response.status(201).json(user);
        } catch (error) {
            console.log(error)
            //return response.json({ error: "erro"})
        }
    }

    async update(request: Request, response: Response){
        try {

            const user_id = request.params;
            const { name, email, location, avatar, username, bio } = request.body;

            const userRepo = getCustomRepository(UsersRepository);
            const user = await userRepo.findOne({ where: { user_id}});

            console.log(user);
            /*if(!user){
                return response.json({ error: "user not found!"});
            }
            
            const checkUserEmail = userRepo.findOne({where: { email}});


            const createUser = userRepo.create({ name, email, location, avatar, username, bio });
            await userRepo.save(createUser);
            /*const user = await checkUserId.execute({
                user_id,
                name,
                email,
                location,
                username,
                bio,
            })

            console.log(createUser)*/
           // return response.status(201).json(createUser);
        }
        catch(error) {
            throw new AppError(error);
        }
    }

    async destroy(request: Request, response: Response): Promise<Response>{
        try{
            const email = request.body;

            const deleteUser = container.resolve(DeleteUser);
            const user = await deleteUser.execute(email);

            return response.json(user);
        }
        catch(err){
            throw new AppError(err);
        }
    }
}

export default UserController;