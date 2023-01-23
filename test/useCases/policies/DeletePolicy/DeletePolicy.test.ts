import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { CreatePolicy } from "../../../../src/useCases/policies/CreatePolicy/CreatePolicy";
import { DeletePolicy } from "../../../../src/useCases/policies/DeletePolicy/DeletePolicy";
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

describe("DeletePolicy", ()=> {
  describe("when the policy exists", ()=> {
    it("should delete a created policy", async ()=> {      
      // Arrange
      const mockCreatedPolicy = createMockPolicy();
      const createdPolicy = await CreatePolicy.execute({name: mockCreatedPolicy.name});
      
      // Act
      await DeletePolicy.execute({policyId: createdPolicy.id});

      // Assert
      const resultPromise = GetPolicyDetails.execute({policyId: createdPolicy.id});
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })

  describe("when the policy not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();

      // Act
      const resultPromise = DeletePolicy.execute({policyId: mockPolicy.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
