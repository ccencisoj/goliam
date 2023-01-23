import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { createMockPermission } from "../../../mocks/createMockPermission";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { createMockPolicyPermission } from "../../../mocks/createMockPolicyPermission";
import { CreatePolicy } from "../../../../src/useCases/policies/CreatePolicy/CreatePolicy";
import { CreatePermission } from "../../../../src/useCases/permissions/CreatePermission/CreatePermission";
import { AddPermissionToPolicy } from "../../../../src/useCases/policies/AddPermissionToPolicy/AddPermissionToPolicy";
import { GetPolicyPermissionDetails } from "../../../../src/useCases/policies/GetPolicyPermissionDetails/GetPolicyPermissionDetails";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("GetPolicyPermissionDetails", ()=> {
  describe("when the policy permission exists", ()=> {
    it("should get policy permission details", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const mockPermission = createMockPermission();
      const policy = await CreatePolicy.execute({name: mockPolicy.name});
      const permission = await CreatePermission.execute({
        name: mockPermission.name,
        value: mockPermission.value
      })
      const policyPermission = await AddPermissionToPolicy.execute({
        policyId: policy.id,
        permissionId: permission.id
      })
      
      // Act
      const policyPermissionDetails = await GetPolicyPermissionDetails.execute({
        policyPermissionId: policyPermission.id
      })

      // Assert
      expect(policyPermissionDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the policy permission not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPolicyPermission = createMockPolicyPermission();

      // Act
      const resultPromise = GetPolicyPermissionDetails.execute({
        policyPermissionId: mockPolicyPermission.id
      })

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
