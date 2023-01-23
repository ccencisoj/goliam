import { GroupUser } from "../../src/entities/GroupUser";
import { generateId } from "../../src/helpers/generateId";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockGroupUser = ()=> {
  const mockGroupUser = {
    id: generateId(),
    userId: generateId(),
    groupId: generateId(),
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as GroupUser;

  return mockGroupUser;
}
