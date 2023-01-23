import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { CreatePolicy } from "../../../../src/useCases/policies/CreatePolicy/CreatePolicy";
import { AlreadyExistsException } from "../../../../src/exceptions/AlreadyExistsException";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("CreatePolicy", ()=> {
  describe("when the policy is unique", ()=> {
    it("should create a policy", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();

      // Act
      const policy = await CreatePolicy.execute({name: mockPolicy.name});

      // Assert
      expect(policy).toBeInstanceOf(Object);
    })
  })

  describe("when the policy is not unique", ()=> {
    it("should throw AlreadyExistsException if the 'name' already exists", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      await CreatePolicy.execute({name: mockPolicy.name});
      
      // Act
      const resultPromise = CreatePolicy.execute({name: mockPolicy.name});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })
  })
})
