import { GroupUser } from "../entities/GroupUser";

export class GroupUserMapper {
  public static toJSON = (groupUser: GroupUser)=> {
    return {
      id: groupUser.id,
      userId: groupUser.userId,
      groupId: groupUser.groupId,
      createdAt: groupUser.createdAt,
      updatedAt: groupUser.updatedAt,
      deletedAt: groupUser.deletedAt,
      isDeleted: groupUser.isDeleted
    }
  }
}
