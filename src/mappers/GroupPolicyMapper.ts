import { GroupPolicy } from "../entities/GroupPolicy";

export class GroupPolicyMapper {
  public static toJSON = (groupPolicy: GroupPolicy)=> {
    return {
      id: groupPolicy.id,
      groupId: groupPolicy.groupId,
      policyId: groupPolicy.policyId,
      createdAt: groupPolicy.createdAt,
      updatedAt: groupPolicy.updatedAt,
      deletedAt: groupPolicy.deletedAt,
      isDeleted: groupPolicy.isDeleted
    }
  }
}
