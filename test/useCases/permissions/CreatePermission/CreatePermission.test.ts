import { Database } from "../../../../src/common/Database"
import { createMockPermission } from "../../../mocks/createMockPermission";
import { AlreadyExistsException } from "../../../../src/exceptions/AlreadyExistsException";
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

describe("CreatePermission", ()=> {
  describe("when the permission values are unique", ()=> {
    it("should create the permission without throw exceptions", async ()=> {
      // Arrange
      const mockPermission = createMockPermission();

      // Act
      const permission = await CreatePermission.execute({
        name: mockPermission.name, 
        value: mockPermission.value
      })

      // Assert
      const permissionDetails = await GetPermissionDetails.execute({permissionId: permission.id});
      expect(permissionDetails).toBeInstanceOf(Object);
    })
  })

  describe("when the permission values are not unique", ()=> {
    it("should throw AlreadyExistsException if there is a permission with the same 'name'", async ()=> {
      // Arrange
      const mockPermission = createMockPermission();
      
      await CreatePermission.execute({
        name: mockPermission.name, 
        value: mockPermission.value
      })

      // Act
      const resultPromise = CreatePermission.execute({
        name: mockPermission.name, 
        value: mockPermission.value
      })

      // Assert
      await expect(resultPromise).rejects.toBeInstanceOf(AlreadyExistsException);
    })
  })
})
