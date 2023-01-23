import { Policy } from "../entities/Policy";

export class PolicyMapper {
  public static toJSON = (policy: Policy)=> {
    return {
      id: policy.id,
      name: policy.name,
      createdAt: policy.createdAt,
      updatedAt: policy.updatedAt,
      deletedAt: policy.deletedAt,
      isDeleted: policy.isDeleted
    }
  }
}
