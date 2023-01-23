import { Database } from "../../../../src/common/Database";
import { createMockPermission } from "../../../mocks/createMockPermission";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { AlreadyExistsException } from "../../../../src/exceptions/AlreadyExistsException";
import { UpdatePermission } from "../../../../src/useCases/permissions/UpdatePermission/UpdatePermission";
import { CreatePermission } from "../../../../src/useCases/permissions/CreatePermission/CreatePermission";
import { GetPermissionDetails } from "../../../../src/useCases/permissions/GetPermissionDetails/GetPermissionDetails";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("UpdatePermission", ()=> {
  describe("when the permission exists and the new values are unique", ()=> {
    it("should update the permission without throw exceptions", async ()=> {
      // Arrange
      const mockPermission = createMockPermission();
      const mockPermissionData = createMockPermission();
      const permission = await CreatePermission.execute({
        name: mockPermission.name,
        value: mockPermission.value
      })

      // Act
      await UpdatePermission.execute({
        permissionId: permission.id,
        name: mockPermissionData.name
      })

      // Assert
      const permissionDetails = await GetPermissionDetails.execute({permissionId: permission.id});
      expect(permissionDetails).toMatchObject({name: mockPermissionData.name});
    })
  })

  describe("when the permission exists and the new values are not unique", ()=> {
    it("should throw AlreadyExistsException if already exists a permission with the same 'name'", async ()=> {
      // Arrange
      const mockPermissionA = createMockPermission();
      const mockPermissionB = createMockPermission();

      const permissionA = await CreatePermission.execute({
        name: mockPermissionA.name,
        value: mockPermissionA.value,
      })

      const permissionB = await CreatePermission.execute({
        name: mockPermissionB.name,
        value: mockPermissionB.value,
      })

      // Act
      const resultPromise = UpdatePermission.execute({
        permissionId: permissionA.id,
        name: permissionB.name
      })

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })
  })  

  describe("when the permission not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPermission = createMockPermission();

      // Act
      const resultPromise = UpdatePermission.execute({permissionId: mockPermission.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
