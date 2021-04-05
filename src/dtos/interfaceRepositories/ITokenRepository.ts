
export default interface ITokenRepository{
    create(user_id: string): Promise<void>;
}