import { EntityRepository, getRepository, Repository } from "typeorm";
import CreateFollowerDTO from "../dtos/CreateFollowerDTO";
import IFollowerRepository from "../dtos/interfaceRepositories/IFollowerRepository";
import { Follower } from "../models/Follower";

@EntityRepository(Follower)
class FollowerRepository extends Repository<Follower>{

    public async findFollower(data: CreateFollowerDTO): Promise<Follower>{
        return await this.findOne({ where: { user_id: data.user_id, follower_id: data.follower_id, }});
    }

    public async findFollowers(user_id: string): Promise<Follower[] | undefined> {
        const followers = await this.find({
            where: {
                user_id,
            },
            relations: ["follower"],
        });

        return followers;
    }
}

export default FollowerRepository;