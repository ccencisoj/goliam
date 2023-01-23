import { Group } from "../../src/entities/Group";
import { generateId } from "../../src/helpers/generateId";
import { getRandomString } from "./helpers/getRandomString";
import { getRandomNumber } from "./helpers/getRandomNumber";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockGroup = ()=> {
  const str = getRandomString();
  const num = getRandomNumber();
  const mockGroup = {
    id: generateId(),
    name: `group${str}${num}`,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as Group;

  return mockGroup;
}
