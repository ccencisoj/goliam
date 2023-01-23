import { PolicyPermission } from "../entities/PolicyPermission";

export class PolicyPermissionMapper {
  public static toJSON = (policyPermission: PolicyPermission)=> {
    return {
      id: policyPermission.id,
      policyId: policyPermission.policyId,
      permissionId: policyPermission.permissionId,
      createdAt: policyPermission.createdAt,
      updatedAt: policyPermission.updatedAt,
      deletedAt: policyPermission.deletedAt,
      isDeleted: policyPermission.isDeleted
    }
  }
}
