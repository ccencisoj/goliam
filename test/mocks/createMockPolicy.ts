import { Policy } from "../../src/entities/Policy";
import { generateString } from "./helpers/generateString";
import { generateId } from "../../src/helpers/generateId";
import { generateNumber } from "./helpers/generateNumber";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockPolicy = ()=> {
  const str = generateString();
  const num = generateNumber();
  const mockPolicy = {
    id: generateId(),
    name: `name${str}${num}`,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as Policy;

  return mockPolicy;
}
