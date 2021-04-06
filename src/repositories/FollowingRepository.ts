import { EntityRepository, getRepository, Repository } from "typeorm";
import CreateFollowingDTO from "../dtos/CreateFollowingDTO";
import IFollowingRepository from "../dtos/interfaceRepositories/IFollowingRepository";
import Following from "../models/Following";

@EntityRepository(Following)
class FollowingRepository extends Repository<Following>{

    async findFollowing(data: CreateFollowingDTO): Promise<Following> {
        return await this.findOne({ where: { user_id: data.user_id, following_id: data.following_id, }});
    }

    async findFollowings(user_id: string): Promise<Following[]> {
        const following = await this.find({ where: {
            user_id,
        }, relations: ["following"] });

        return following;
    }
}

export default FollowingRepository;