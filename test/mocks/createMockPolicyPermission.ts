import { generateId } from "../../src/helpers/generateId";
import { PolicyPermission } from "../../src/entities/PolicyPermission"
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockPolicyPermission = ()=> {
  const mockPolicyPermission = {
    id: generateId(),
    policyId: generateId(),
    permissionId: generateId(),
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as PolicyPermission;

  return mockPolicyPermission;
}
