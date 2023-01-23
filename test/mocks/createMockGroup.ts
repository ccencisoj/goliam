import { Group } from "../../src/entities/Group";
import { generateId } from "../../src/helpers/generateId";
import { generateString } from "./helpers/generateString";
import { generateNumber } from "./helpers/generateNumber";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockGroup = ()=> {
  const str = generateString();
  const num = generateNumber();
  const mockGroup = {
    id: generateId(),
    name: `group${str}${num}`,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as Group;

  return mockGroup;
}
