import { generateId } from "../../src/helpers/generateId";
import { Permission } from "../../src/entities/Permission";
import { getRandomString } from "./helpers/getRandomString";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockPermission = ()=> {
  const str = getRandomString();
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
