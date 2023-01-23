import { Database } from "../../../../src/common/Database";
import { createMockGroup } from "../../../mocks/createMockGroup";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { UpdateGroup } from "../../../../src/useCases/groups/UpdateGroup/UpdateGroup";
import { CreateGroup } from "../../../../src/useCases/groups/CreateGroup/CreateGroup";
import { AlreadyExistsException } from "../../../../src/exceptions/AlreadyExistsException";
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

describe("UpdateGroup", ()=> {
  describe("when the group exists and the new values are uniques", ()=> {
    it("should update the group without throw exceptions", async ()=> {
      // Arrange
      const mockGroup = createMockGroup();
      const mockGroupData = createMockGroup();
      const group = await CreateGroup.execute({name: mockGroup.name});

      // Act
      await UpdateGroup.execute({
        groupId: group.id,
        name: mockGroupData.name
      })

      // Assert
      const groupDetails = await GetGroupDetails.execute({groupId: group.id});
      expect(groupDetails).toMatchObject({name: mockGroupData.name});
    })
  })

  describe("when the group exists and the new value are not uniques", ()=> {
    it("should throw AlreadyExistsException", async ()=> {
      // Arrange
      const mockGroupA = createMockGroup();
      const mockGroupB= createMockGroup();
      const groupA = await CreateGroup.execute({name: mockGroupA.name});
      const groupB = await CreateGroup.execute({name: mockGroupB.name});

      // Act
      const resultPromise = UpdateGroup.execute({
        groupId: groupA.id,
        name: groupB.name
      })

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })
  })

  describe("when the group not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockGroup = createMockGroup();

      // Act
      const resultPromise = UpdateGroup.execute({
        groupId: mockGroup.id,
        name: mockGroup.name
      })
      
      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
