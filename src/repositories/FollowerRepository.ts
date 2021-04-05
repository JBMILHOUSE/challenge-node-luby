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


   /* private followerRepo: Repository<Follower>;

    constructor(){
        this.followerRepo = getRepository(Follower);
    }

    public async findById(id: string): Promise<Follower | undefined> {
       const follower = await this.followerRepo.findOne(id);
       return follower;
    }

    public async findFollowers(user_id: string): Promise<Follower[] | undefined> {
        const followers = await this.followerRepo.find({
            where: {
                user_id,
            },
            relations: ["follower"],
        });

        return followers;
    }

    public async findFollower(data: CreateFollowerDTO): Promise<Follower> {
        const follower = await this.followerRepo.findOne({
            where: {
                user_id: data.user_id,
                follower_id: data.follower_id,
            },
        });

        return follower;
    }

    public async create(data: CreateFollowerDTO): Promise<Follower> {
       const follower = this.followerRepo.create(data);
       await this.followerRepo.save(follower);

       return follower;
    }

    public async delete(follower_id: string): Promise<void> {
      await this.followerRepo.delete({ follower_id });
    }

    public async save(follower: Follower): Promise<Follower> {
       return this.followerRepo.save(follower);
    }

    public async count(user_id: string): Promise<number | undefined> {
       const number = await this.followerRepo.count({
           where: { user_id },
       });

       return number;
    }*/
}

export default FollowerRepository;