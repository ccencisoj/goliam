import { User } from "../entities/User";

export class UserMapper {
  public static toJSON = (user: User)=> {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      isDeleted: user.isDeleted
    }
  }
}
