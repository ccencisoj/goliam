import { Database } from "../../../../src/common/Database";
import { createMockUser } from "../../../mocks/createMockUser";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { UpdateUser } from "../../../../src/useCases/users/UpdateUser/UpdateUser";
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

describe("UpdateUser", ()=> {
  describe("when the user exists", ()=> {
    it("should update the user", async ()=> {
      // Arrange
      const mockUser = createMockUser();
      const userCreated = await CreateUser.execute({
        type: mockUser.type,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password
      })
      const mockUserData = createMockUser();
      const newUserData = {
        username: mockUserData.username,
        email: mockUserData.email
      }

      // Act
      await UpdateUser.execute({userId: userCreated.id, ...newUserData});

      // Assert
      const userDetails = await GetUserDetails.execute({userId: userCreated.id});
      expect(userDetails).toMatchObject(newUserData);
    })
  })

  describe("when the user not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockUser = createMockUser();

      // Act
      const resultPromise = UpdateUser.execute({userId: mockUser.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
