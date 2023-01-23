import { generateId } from "../../src/helpers/generateId";
import { UserPolicy } from "../../src/entities/UserPolicy";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockUserPolicy = ()=> {
  const mockUserPolicy = {
    id: generateId(),
    userId: generateId(),
    policyId: generateId(),
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as UserPolicy;

  return mockUserPolicy;
}
