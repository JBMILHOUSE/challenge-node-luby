import { EntityRepository, Repository } from "typeorm";
import { Token } from "../models/Token"

@EntityRepository(Token)
class TokenRepository extends Repository<Token>{}

export { TokenRepository };