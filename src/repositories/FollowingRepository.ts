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

   /* private followingRepo: Repository<Following>;

    constructor(){
        this.followingRepo = getRepository(Following);
    }
    
    async findById(id: string): Promise<Following> {
        const following = await this.followingRepo.findOne(id);
        return following;
    }

    async findFollowings(user_id: string): Promise<Following[]> {
        const following = await this.followingRepo.find({ where: {
            user_id,
        }, relations: ["following"] });

        return following;
    }

    async findFollowing(data: CreateFollowingDTO): Promise<Following> {
        const following = await this.followingRepo.findOne({
            where: {
                user_id: data.user_id,
                following_id: data.following_id,
            },
        });

        return following;
    }

    async create(data: CreateFollowingDTO): Promise<Following> {
        const following = this.followingRepo.create(data);
        await this.followingRepo.save(following);
        return following;
    }

    async delete(following_id: string): Promise<void> {
       await this.followingRepo.delete({ following_id });
    }

    async save(following: Following): Promise<Following> {
      return this.followingRepo.save(following);
    }

    async count(user_id: string): Promise<number> {
        const cont = await this.followingRepo.count({
            where: {
                user_id,
            },
        });

        return cont
    }*/
}

export default FollowingRepository;