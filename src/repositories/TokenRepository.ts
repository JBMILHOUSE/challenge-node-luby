import { EntityRepository, getRepository, Repository } from "typeorm";
import ITokenRepository from "../dtos/interfaceRepositories/ITokenRepository";
import Token from "../models/Token"

@EntityRepository(Token)
class TokenRepository extends Repository<Token>{
   /* private tokenRepository: Repository<Token>;

    constructor(){
        this.tokenRepository = getRepository(Token);
    }

    public async create(user_id: string): Promise<void> {
       const tokens = this.tokenRepository.create({ user_id });

       await this.tokenRepository.save(tokens);
    }*/

}

export default TokenRepository;