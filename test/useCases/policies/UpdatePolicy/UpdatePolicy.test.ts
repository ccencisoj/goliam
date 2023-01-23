import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { UpdatePolicy } from "../../../../src/useCases/policies/UpdatePolicy/UpdatePolicy";
import { CreatePolicy } from "../../../../src/useCases/policies/CreatePolicy/CreatePolicy";
import { GetPolicyDetails } from "../../../../src/useCases/policies/GetPolicyDetails/GetPolicyDetails";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("UpdatePolicy", ()=> {
  describe("when the policy exists", ()=> {
    it("should update a created policy", async ()=> {
      // Arrange
      const mockPolicyData = createMockPolicy();
      const mockCreatedPolicy = createMockPolicy();
      const createdPolicy = await CreatePolicy.execute({name: mockCreatedPolicy.name});
      
      // Act
      await UpdatePolicy.execute({
        policyId: createdPolicy.id, 
        name: mockPolicyData.name
      })

      // Assert
      const createdPolicyDetails = await GetPolicyDetails.execute({policyId: createdPolicy.id});
      expect(createdPolicyDetails).toMatchObject({name: mockPolicyData.name});
    })
  })

  describe("when the policy not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const mockPolicyData = createMockPolicy();

      // Act
      const resultPromise = UpdatePolicy.execute({
        policyId: mockPolicy.id, 
        name: mockPolicyData.name
      })

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
