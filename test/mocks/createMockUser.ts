import { User } from "../../src/entities/User";
import { generateId } from "../../src/helpers/generateId";
import { generateString } from "./helpers/generateString";
import { getCurrentDate } from "../../src/helpers/getCurrentDate";

export const createMockUser = ()=> {
  const str = generateString();
  const mockuser = {
    id: generateId(),
    type: "user",
    username: `username${str}`,
    email: `email${str}@gmail.com`,
    password: "MyPassword1234",
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    isDeleted: false
  } as User;

  return mockuser;
}
