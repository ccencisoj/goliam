import { generateString } from "./helpers/generateString";
import { generateId } from "../../src/helpers/generateId";
import { Permission } from "../../src/entities/Permission";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockPermission = ()=> {
  const str = generateString();
  const mockPermission = {
    id: generateId(),
    name: `name${str}`,
    value: `value${str}`,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as Permission;

  return mockPermission;
}
