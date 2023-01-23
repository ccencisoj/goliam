import { Database } from "../../../../src/common/Database";
import { createMockGroup } from "../../../mocks/createMockGroup";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { CreateGroup } from "../../../../src/useCases/groups/CreateGroup/CreateGroup";
import { GetGroupDetails } from "../../../../src/useCases/groups/GetGroupDetails/GetGroupDetails";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("GetGroupDetails", ()=> {
  describe("when the group exists", ()=> {
    it("should get the details of a created group", async ()=> {
      // Arrange
      const mockCreatedGroup = createMockGroup();
      const createdGroup = await CreateGroup.execute({name: mockCreatedGroup.name});

      // Act
      const createdGroupDetails = await GetGroupDetails.execute({groupId: createdGroup.id});

      // Assert
      expect(createdGroupDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the group not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockGroup = createMockGroup();

      // Act
      const resultPromise = GetGroupDetails.execute({groupId: mockGroup.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
