import { mockUsers } from "../../../mocks/mockUsers";
import { connectDatabase } from "../../../../src/database/connectDatabase";
import { disconnectDatabase } from "../../../../src/database/disconnectDatabase";
import { CreateUser } from "../../../../src/useCases/users/CreateUser/CreateUser";
import { CreateUserGuard } from "../../../../src/useCases/users/CreateUser/CreateUserGuard";
import { UserRepository } from "../../../../src/repositories/UserRepository/UserRepository";

jest.mock("./CreateUserGuard");

const mockedCreateUserGuard = jest.mocked(CreateUserGuard);

mockedCreateUserGuard.check.mockImplementation(()=> null);

describe("CreateUser", ()=> {

  beforeAll(async ()=> {
    await connectDatabase();
  })

  afterAll(async ()=> {
    await disconnectDatabase();
  })

  test("Should create a user", async ()=> {
    const user = await CreateUser.execute({...mockUsers[0], token: ""});
    const repoUser = await UserRepository.findOne({id: user.id});
    expect(repoUser).not.toBeNull();
  })
})
