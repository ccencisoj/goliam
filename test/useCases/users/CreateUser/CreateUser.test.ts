import { Database } from "../../../../src/common/Database";
import { createMockUser } from "../../../mocks/createMockUser";
import { CreateUser } from "../../../../src/useCases/users/CreateUser/CreateUser";
import { AlreadyExistsException } from "../../../../src/exceptions/AlreadyExistsException";
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

describe("CreateUser", ()=> {
  describe("when the user is unique", ()=> {
    it("should create a user", async ()=> {
      // Arrange
      const mockUser = createMockUser();
      
      // Act
      const userCreated = await CreateUser.execute({
        type: mockUser.type,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password
      })

      // Assert
      const userDetails = await GetUserDetails.execute({userId: userCreated.id});
      expect(userDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the user is not unique", ()=> {
    it("should throw AlreadyExistsException if there is a user with the same 'username'", async ()=> {
      // Arrange
      const mockUser = createMockUser();
      const mockUserAlready = createMockUser();

      await CreateUser.execute({
        type: mockUserAlready.type,
        username: mockUserAlready.username,
        email: mockUserAlready.email,
        password: mockUserAlready.password
      })

      // Act
      const resultPromise = CreateUser.execute({
        type: mockUser.type,
        username: mockUserAlready.username,
        email: mockUser.email,
        password: mockUser.password
      })

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })

    it("should throw AlreadyExistsExcpetion if there is a user with the same 'email'", async ()=> {
      // Arrange
      const mockUser = createMockUser();
      const mockUserAlready = createMockUser();

      await CreateUser.execute({
        type: mockUserAlready.type,
        username: mockUserAlready.username,
        email: mockUserAlready.email,
        password: mockUserAlready.password
      })

      // Act
      const resultPromise = CreateUser.execute({
        type: mockUser.type,
        username: mockUser.username,
        email: mockUserAlready.email,
        password: mockUser.password
      })

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })
  })
})
