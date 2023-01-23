import { User } from "../entities/User";

export class UserMapper {
  public static toJSON = (user: User)=> {
    return {
      id: user.id,
      type: user.type,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      isDeleted: user.isDeleted
    }
  }
}
