import { Database } from "../../../../src/common/Database";
import { createMockGroup } from "../../../mocks/createMockGroup";
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

describe("CreateGroup", ()=> {
  describe("when the group values are unique", ()=> {
    it("should create the group without throw exceptions", async ()=> {
      // Arrange
      const mockGroup = createMockGroup();

      // Act
      const group = await CreateGroup.execute({name: mockGroup.name});

      // Assert
      const groupDetails = await GetGroupDetails.execute({groupId: group.id});
      expect(groupDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the group values are not unique", ()=> {
    it("should throw AlreadyExistsException if there is a group with the same 'name'", async ()=> {
      // Arrange
      const mockGroup = createMockGroup();
      await CreateGroup.execute({name: mockGroup.name});
      
      // Act
      const resultPromise = CreateGroup.execute({name: mockGroup.name});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })
  })
})
