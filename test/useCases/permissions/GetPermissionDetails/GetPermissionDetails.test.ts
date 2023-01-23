import { Database } from "../../../../src/common/Database";
import { createMockPermission } from "../../../mocks/createMockPermission";
import { NoFoundException } from "../../../../src/exceptions/NoFoundException";
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

describe("GetPermissionDetails", ()=> {
  describe("when the permission exists", ()=> {
    it("should get the permission details", async ()=> {
      // Arrange
      const mockPermission = createMockPermission();
      const permission = await CreatePermission.execute({
        name: mockPermission.name,
        value: mockPermission.value
      })

      // Act
      const permissionDetails = await GetPermissionDetails.execute({permissionId: permission.id});

      // Assert
      expect(permissionDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the permission not exists", ()=> {
    it("should throw NoFoundException", async ()=> {
      // Arrange
      const mockPermission = createMockPermission();
  
      // Act
      const resultPromise = GetPermissionDetails.execute({permissionId: mockPermission.id});

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(NoFoundException);
    })
  })
})
