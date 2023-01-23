import { Database } from "../../../../src/common/Database";
import { createMockUser } from "../../../mocks/createMockUser";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { DeleteUser } from "../../../../src/useCases/users/DeleteUser/DeleteUser";
import { CreateUser } from "../../../../src/useCases/users/CreateUser/CreateUser";
import { GetUserDetails } from "../../../../src/useCases/users/GetUserDetails/GetUserDetails";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("DeleteUser", ()=> {
  describe("when the user exists", ()=> {
    it("should delete the existing user", async ()=> {
      // Arrange
      const mockUser = createMockUser();
      const userCreated = await CreateUser.execute({
        type: mockUser.type,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password
      })

      // Act
      await DeleteUser.execute({userId: userCreated.id});

      // Assert
      const resultPromise = GetUserDetails.execute({userId: userCreated.id});
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })

  describe("when the user not exists", ()=> {
    it("should throw NoFoundException why the user not exists", async ()=> {
      // Arrange
      const mockUser = createMockUser();

      // Act
      const resultPromise = DeleteUser.execute({userId: mockUser.id});
  
      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
