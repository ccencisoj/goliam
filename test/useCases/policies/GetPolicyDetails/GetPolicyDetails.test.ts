import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
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

describe("GetPolicyDetails", ()=> {
  describe("when the policy exists", ()=> {
    it("should get the policy details", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const policy = await CreatePolicy.execute({name: mockPolicy.name});

      // Act
      const policyDetails = await GetPolicyDetails.execute({policyId: policy.id});

      // Assert
      expect(policyDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the policy not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();

      // Act
      const resultPromise = GetPolicyDetails.execute({policyId: mockPolicy.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
