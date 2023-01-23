import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { GetPolicies } from "../../../../src/useCases/policies/GetPolicies/GetPolicies";
import { CreatePolicy } from "../../../../src/useCases/policies/CreatePolicy/CreatePolicy";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("GetPolicies", ()=> {
  describe("when there is policies", ()=> {
    it("should return a array with two policy", async ()=> {
      // Arrange
      const mockPolicy1 = createMockPolicy();
      const mockPolicy2 = createMockPolicy();

      await CreatePolicy.execute({name: mockPolicy1.name});
      await CreatePolicy.execute({name: mockPolicy2.name});

      // Act
      const { policies } = await GetPolicies.execute({});

      // Assert
      expect(policies.length).toBe(2);
    })
  })

  describe("when there is not policies", ()=> {
    it("should return a empty array", async ()=> {
      // Act
      const { policies } = await GetPolicies.execute({});

      // Assert
      expect(policies.length).toBe(0);
    })
  })

  describe("when there is not policies in the page", ()=> {
    it("should return a empty array", async ()=> {
      // Arrange
      const mockPolicy1 = createMockPolicy();
      const mockPolicy2 = createMockPolicy();

      await CreatePolicy.execute({name: mockPolicy1.name});
      await CreatePolicy.execute({name: mockPolicy2.name});

      // Act
      const { policies } = await GetPolicies.execute({page: 50});

      // Assert
      expect(policies.length).toBe(0);
    })
  })
})
