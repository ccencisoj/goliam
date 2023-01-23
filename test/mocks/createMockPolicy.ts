import { Policy } from "../../src/entities/Policy";
import { generateId } from "../../src/helpers/generateId";
import { getRandomNumber } from "./helpers/getRandomNumber";
import { getRandomString } from "./helpers/getRandomString";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockPolicy = ()=> {
  const str = getRandomString();
  const num = getRandomNumber();
  const mockPolicy = {
    id: generateId(),
    name: `name${str}${num}`,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as Policy;

  return mockPolicy;
}
