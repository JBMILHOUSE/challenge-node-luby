import { Follower } from "../../models/Follower";
import CreateFollowerDTO from "../CreateFollowerDTO";


export default interface IFollowerRepository{
    findById(id: string): Promise<Follower | undefined>;
    findFollowers(user_id: string): Promise<Follower[] | undefined>;
    findFollower(data: CreateFollowerDTO): Promise<Follower | undefined>;
    create(data: CreateFollowerDTO): Promise<Follower>;
    delete(follower_id: string): Promise<void>;
    save(follower: Follower): Promise<Follower>;
    count(user_id: string): Promise<number| undefined>;
}