import { User } from "../entities/User";

export class UserMapper {
  public static toJSON = (user: User)=> {
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      isDeleted: user.isDeleted
    }
  }
}
