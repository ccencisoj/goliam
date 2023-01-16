import { mockUsers } from "../../../mocks/mockUsers";
import { connectDatabase } from "../../../../src/database/connectDatabase";
import { disconnectDatabase } from "../../../../src/database/disconnectDatabase";
import { CreateUser } from "../../../../src/useCases/users/CreateUser/CreateUser";
import { AlreadyExistsException } from "../../../../src/exceptions/AlreadyExistsException";
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

  test("Should create a user in the database", async ()=> {
    const dto = {token: "", ...mockUsers[0]};
    const user = await CreateUser.execute(dto);
    const repoUser = await UserRepository.findOne({id: user.id});
    expect(repoUser).not.toBeNull();
  })

  describe("CreateUser", async ()=> {
    test("Should throw AlreadyExistsException if the 'username' already exists", async ()=> {
      const dto = {token: "", username: mockUsers[0].username, ...mockUsers[1]};
      const resultPromise = CreateUser.execute(dto);   
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })

    test("Should throw AlreadyExistsException if the 'email' already exists", async ()=> {
      const dto = {token: "", email: mockUsers[0].email, ...mockUsers[1]};
      const resultPromise = CreateUser.execute(dto);      
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })
  })
})
