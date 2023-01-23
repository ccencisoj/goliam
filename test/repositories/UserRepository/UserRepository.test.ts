import { Database } from "../../../src/common/Database";
import { createMockUser } from "../../mocks/createMockUser";
import { UserRepository } from "../../../src/repositories/UserRepository";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("UserRepository", ()=> {
  describe("save", ()=> {
    it("should save a user", async ()=> {
      // Arrange
      const mockUser = createMockUser();
      
      // Act
      await UserRepository.save(mockUser);

      // Assert
      const repoUser = await UserRepository.findOne({id: mockUser.id});
      expect(repoUser).toMatchObject(mockUser);
    })
  })

  describe("findOne", ()=> {
    it("should get a saved user", async ()=> {
      // Arrange
      const mockUser = createMockUser();
      await UserRepository.save(mockUser);

      // Act
      const repoUser = await UserRepository.findOne({id: mockUser.id});

      // Assert
      expect(repoUser).toMatchObject(mockUser);
    })
  })

  describe("findMany", ()=> {
    it("should list two the users", async ()=> {
      // Arrange
      const mockUser1 = createMockUser();
      const mockUser2 = createMockUser();
      await UserRepository.save(mockUser1);
      await UserRepository.save(mockUser2);

      // Act
      const repoUsers = await UserRepository.findMany({});

      // Assert
      expect(repoUsers.length).toBe(2);
    })
  })
})
