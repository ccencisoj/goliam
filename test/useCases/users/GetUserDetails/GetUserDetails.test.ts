import { Database } from "../../../../src/common/Database";
import { createMockUser } from "../../../mocks/createMockUser";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
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

describe("GetUserDetails", ()=> {
  describe("when the user exists", ()=> {
    it("should return the user details", async ()=> {
      // Arrange
      const mockUser = createMockUser();

      const userCreated = await CreateUser.execute({
        type: mockUser.type,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password
      })

      // Act
      const userDetails = await GetUserDetails.execute({userId: userCreated.id});

      // Assert
      expect(userDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the user not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockUser = createMockUser();

      // Act
      const resultPromise = GetUserDetails.execute({userId: mockUser.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
