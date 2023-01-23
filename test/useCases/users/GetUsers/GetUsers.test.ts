import { Database } from "../../../../src/common/Database";
import { createMockUser } from "../../../mocks/createMockUser";
import { GetUsers } from "../../../../src/useCases/users/GetUsers/GetUsers";
import { CreateUser } from "../../../../src/useCases/users/CreateUser/CreateUser";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("GetUsers", ()=> {
  describe("when there are users", ()=> {
    it("should return a array with two users", async ()=> {
      // Arrange
      const mockUser1 = createMockUser();
      const mockUser2 = createMockUser();
      
      await CreateUser.execute({
        type: mockUser1.type,
        username: mockUser1.username,
        email: mockUser1.email,
        password: mockUser1.password
      })

      await CreateUser.execute({
        type: mockUser2.type,
        username: mockUser2.username,
        email: mockUser2.email,
        password: mockUser2.password
      })

      // Act
      const { users } = await GetUsers.execute({});

      // Assert
      expect(users.length).toBe(2);
    })
  })

  describe("when there are not users", ()=> {
    it("should return a empty array", async ()=> {
      // Act
      const { users } = await GetUsers.execute({});
      
      // Assert
      expect(users.length).toBe(0);
    })
  })
})
