import { Database } from "../../../../src/common/Database";
import { createMockPolicy } from "../../../mocks/createMockPolicy";
import { createMockPermission } from "../../../mocks/createMockPermission";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { AlreadyExistsException } from "../../../../src/exceptions/AlreadyExistsException";
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

describe("AddPermissionToPolicy", ()=> {
  describe("when the policy and permission exist. And the permission has not been previously added", ()=> {
    it("should add the permission to policy without throw exceptions", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const mockPermission = createMockPermission();
      const policy = await CreatePolicy.execute({name: mockPolicy.name});
      const permission = await CreatePermission.execute({
        name: mockPermission.name,
        value: mockPermission.value
      })
      
      // Act
      const policyPermission = await AddPermissionToPolicy.execute({
        policyId: policy.id,
        permissionId: permission.id
      })
  
      // Assert
      const policyPermissionDetails = await GetPolicyPermissionDetails.execute({
        policyPermissionId: policyPermission.id
      })
      expect(policyPermissionDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the policy and permission exist. And the permission has been previusly added", ()=> {
    it("should throw AlreadyExistsException", async ()=> {
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
      const resultPromise = AddPermissionToPolicy.execute({
        policyId: policy.id,
        permissionId: permission.id
      })
  
      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })
  })

  describe("when the policy not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const mockPermission = createMockPermission();
      const permission = await CreatePermission.execute({
        name: mockPermission.name,
        value: mockPermission.value
      })
      
      // Act
      const resultPromise = AddPermissionToPolicy.execute({
        policyId: mockPolicy.id,
        permissionId: permission.id
      })
  
      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })

  describe("when the permission not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPolicy = createMockPolicy();
      const mockPermission = createMockPermission();
      const policy = await CreatePolicy.execute({name: mockPolicy.name});
    
      // Act
      const resultPromise = AddPermissionToPolicy.execute({
        policyId: policy.id,
        permissionId: mockPermission.id
      })
  
      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
