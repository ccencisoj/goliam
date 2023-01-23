import { Group } from "../entities/Group";

export class GroupMapper {
  public static toJSON = (group: Group)=> {
    return {
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      deletedAt: group.deletedAt,
      isDeleted: group.isDeleted
    }
  }
}
