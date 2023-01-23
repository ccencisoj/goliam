import { Database } from "../../../../src/common/Database";
import { createMockPermission } from "../../../mocks/createMockPermission";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
import { CreatePermission } from "../../../../src/useCases/permissions/CreatePermission/CreatePermission";
import { DeletePermission } from "../../../../src/useCases/permissions/DeletePermission/DeletePermission";
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

describe("DeletePermission", ()=> {
  describe("when the permission exists", ()=> {
    it("should delete the permission", async ()=> {
      // Arrange
      const mockPermission = createMockPermission();
      const permission = await CreatePermission.execute({
        name: mockPermission.name,
        value: mockPermission.value
      })

      // Act
      await DeletePermission.execute({permissionId: permission.id});

      // Assert
      const resultPromise = GetPermissionDetails.execute({permissionId: permission.id});
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })

  describe("when the permission not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPermission = createMockPermission();

      // Act
      const resultPromise = DeletePermission.execute({permissionId: mockPermission.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
