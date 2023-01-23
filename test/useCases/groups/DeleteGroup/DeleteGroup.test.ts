import { Database } from "../../../../src/common/Database";
import { createMockGroup } from "../../../mocks/createMockGroup";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { CreateGroup } from "../../../../src/useCases/groups/CreateGroup/CreateGroup";
import { DeleteGroup } from "../../../../src/useCases/groups/DeleteGroup/DeleteGroup";
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

describe("DeleteGroup", ()=> {
  describe("when the group exists", ()=> {
    it("should delete the group", async ()=> {
      // Arrange
      const mockGroup = createMockGroup();
      const group = await CreateGroup.execute({name: mockGroup.name});

      // Act
      await DeleteGroup.execute({groupId: group.id});

      // Assert
      const resultPromise = GetGroupDetails.execute({groupId: group.id});
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })

  describe("when the group not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockGroup = createMockGroup();

      // Act
      const resultPromise = DeleteGroup.execute({groupId: mockGroup.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
