import { EntityRepository, getRepository, Repository } from "typeorm";
import ITokenRepository from "../dtos/interfaceRepositories/ITokenRepository";
import Token from "../models/Token"

@EntityRepository(Token)
class TokenRepository extends Repository<Token>{

}

export default TokenRepository;