import { Permission } from "../entities/Permission";

export class PermissionMapper {
  public static toJSON = (permission: Permission)=> {
    return {
      id: permission.id,
      name: permission.name,
      value: permission.value,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
      deletedAt: permission.deletedAt,
      isDeleted: permission.isDeleted
    }
  }
}
