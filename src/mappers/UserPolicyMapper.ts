import { UserPolicy } from "../entities/UserPolicy";

export class UserPolicyMapper {
  public static toJSON = (userPolicy: UserPolicy)=> {
    return {
      id: userPolicy.id,
      userId: userPolicy.userId,
      policyId: userPolicy.policyId,
      createdAt: userPolicy.createdAt,
      updatedAt: userPolicy.updatedAt,
      deletedAt: userPolicy.deletedAt,
      isDeleted: userPolicy.isDeleted
    }
  }
}
