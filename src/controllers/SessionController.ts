import { Request, Response } from "express";

import { container } from "tsyringe";
import AuthenticateUsers from "../service/Users/AuthenticateUsers";
import AppError from "../error/AppError";

class SessionController{
    async create(request: Request, response: Response){
        const { email } = request.body;
        const authUser = container.resolve(AuthenticateUsers);

        const { user, token } = await authUser.execute({
            email,
        });

        return response.json({ userWithoutPassword: user, token, });
    }
    catch(err){
        throw new AppError(err);
        
    }

}

export default SessionController;