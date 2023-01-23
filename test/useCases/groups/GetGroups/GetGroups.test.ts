import { Database } from "../../../../src/common/Database";
import { createMockGroup } from "../../../mocks/createMockGroup";
import { GetGroups } from "../../../../src/useCases/groups/GetGroups/GetGroups";
import { CreateGroup } from "../../../../src/useCases/groups/CreateGroup/CreateGroup";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("GetGroups", ()=> {
  describe("when there are created groups", ()=> {
    it("should return a array with two groups", async ()=> {
      // Arrange
      const mockCreatedGroup1 = createMockGroup();
      const mockCreatedGroup2 = createMockGroup();
      await CreateGroup.execute({name: mockCreatedGroup1.name})
      await CreateGroup.execute({name: mockCreatedGroup2.name})

      // Act
      const { groups } = await GetGroups.execute({});

      // Assert
      expect(groups.length).toBe(2);
    })
  })

  describe("when the next page there are not created groups", ()=> {
    it("should return a empty arrya", async ()=> {
      // Arrange
      const mockCreatedGroup1 = createMockGroup();
      const mockCreatedGroup2 = createMockGroup();
      await CreateGroup.execute({name: mockCreatedGroup1.name})
      await CreateGroup.execute({name: mockCreatedGroup2.name})

      // Act
      const { groups } = await GetGroups.execute({page: 50});

      // Assert
      expect(groups.length).toBe(0);
    })
  })

  describe("when there are not created groups", ()=> {
    it("should return a empty array", async ()=> {
      // Act
      const { groups } = await GetGroups.execute({});

      // Assert
      expect(groups.length).toBe(0);
    })
  })
})
