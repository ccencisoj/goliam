import { generateId } from "../../src/helpers/generateId";
import { GroupPolicy } from "../../src/entities/GroupPolicy";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockGroupPolicy = ()=> {
  const mockGroupPolicy = {
    id: generateId(),
    groupId: generateId(),
    policyId: generateId(),
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as GroupPolicy;

  return mockGroupPolicy;
}
