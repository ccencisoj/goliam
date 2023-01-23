import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { createMockPermission } from "../../../mocks/createMockPermission";
import { CreatePolicy } from "../../../../src/useCases/policies/CreatePolicy/CreatePolicy";
import { CreatePermission } from "../../../../src/useCases/permissions/CreatePermission/CreatePermission";
import { GetPolicyPermissions } from "../../../../src/useCases/policies/GetPolicyPermissions/GetPolicyPermissions";
import { AddPermissionToPolicy } from "../../../../src/useCases/policies/AddPermissionToPolicy/AddPermissionToPolicy";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("GetPolicyPermissions", ()=> {
  describe("when there are policy permissions", ()=> {
    it("should return a array with two policy permissions", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const mockPermission1 = createMockPermission();
      const mockPermission2 = createMockPermission();
      const policy = await CreatePolicy.execute({name: mockPolicy.name});
      const permission1 = await CreatePermission.execute({
        name: mockPermission1.name,
        value: mockPermission1.value
      })
      const permission2 = await CreatePermission.execute({
        name: mockPermission2.name,
        value: mockPermission2.value
      })
      await AddPermissionToPolicy.execute({
        policyId: policy.id,
        permissionId: permission1.id
      })
      await AddPermissionToPolicy.execute({
        policyId: policy.id,
        permissionId: permission2.id
      })

      // Act
      const { policyPermissions } = await GetPolicyPermissions.execute({policyId: policy.id});
      
      // Assert
      expect(policyPermissions.length).toBe(2);
    })

    it("should return empty array because the next page has not policy permissions", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const mockPermission1 = createMockPermission();
      const mockPermission2 = createMockPermission();
      const policy = await CreatePolicy.execute({name: mockPolicy.name});
      const permission1 = await CreatePermission.execute({
        name: mockPermission1.name,
        value: mockPermission1.value
      })
      const permission2 = await CreatePermission.execute({
        name: mockPermission2.name,
        value: mockPermission2.value
      })
      await AddPermissionToPolicy.execute({
        policyId: policy.id,
        permissionId: permission1.id
      })
      await AddPermissionToPolicy.execute({
        policyId: policy.id,
        permissionId: permission2.id
      })

      // Act
      const { policyPermissions } = await GetPolicyPermissions.execute({policyId: policy.id, page: 50});
      
      // Assert
      expect(policyPermissions.length).toBe(0);
    })
  })

  describe("when there are not policy permissions", ()=> {
    it("should return a empty array", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const policy = await CreatePolicy.execute({name: mockPolicy.name});      
      
      // Act
      const { policyPermissions } = await GetPolicyPermissions.execute({policyId: policy.id});

      // Assert
      expect(policyPermissions.length).toBe(0);
    })
  })
})
