import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { createMockPermission } from "../../../mocks/createMockPermission";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { createMockPolicyPermission } from "../../../mocks/createMockPolicyPermission";
import { CreatePolicy } from "../../../../src/useCases/policies/CreatePolicy/CreatePolicy";
import { CreatePermission } from "../../../../src/useCases/permissions/CreatePermission/CreatePermission";
import { AddPermissionToPolicy } from "../../../../src/useCases/policies/AddPermissionToPolicy/AddPermissionToPolicy";
import { DeletePolicyPermission } from "../../../../src/useCases/policies/DeletePolicyPermission/DeletePolicyPermission";
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

describe("DeletePolicyPermission", ()=> {
  describe("when the policy permission exists", ()=> {
    it("should delete the policy permission", async ()=> {
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
      await DeletePolicyPermission.execute({policyPermissionId: policyPermission.id});

      // Assert
      const resultPromise = GetPolicyPermissionDetails.execute({
        policyPermissionId: policyPermission.id
      })
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })

  describe("when the policy permission not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPolicyPermission = createMockPolicyPermission();

      // Act
      const resultPromise = DeletePolicyPermission.execute({policyPermissionId: mockPolicyPermission.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
