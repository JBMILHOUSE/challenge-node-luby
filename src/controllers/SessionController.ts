import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { authConfig } from "../config/auth";
import { UserRepository } from "../repositories/UserRepository";

import { sign } from "jsonwebtoken";
import { TokenRepository } from "../repositories/TokenRepository";

class SessionController{
    async create(request: Request, response: Response){
        const { email } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({ email })

        if(!user) {
            return response.status(404).json({ error: "User not found"})
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

       return response.json({ token, user});

    }
}

export { SessionController };