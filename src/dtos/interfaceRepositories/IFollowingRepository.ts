import Following from "../../models/Following";
import CreateFollowingDTO from "../CreateFollowingDTO";

export default interface IFollowingRepository{
    findById(id: string): Promise<Following | undefined>;
    findFollowings(user_id: string): Promise<Following[] | undefined>;
    findFollowing(data: CreateFollowingDTO): Promise<Following | undefined>;
    create(data: CreateFollowingDTO): Promise<Following>;
    delete(following_id: string): Promise<void>;
    save(following: Following): Promise<Following>;
    count(user_id: string): Promise<number| undefined>;
}