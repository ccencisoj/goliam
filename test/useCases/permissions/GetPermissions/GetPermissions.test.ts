import { Database } from "../../../../src/common/Database";
import { createMockPermission } from "../../../mocks/createMockPermission";
import { GetPermissions } from "../../../../src/useCases/permissions/GetPermissions/GetPermissions";
import { CreatePermission } from "../../../../src/useCases/permissions/CreatePermission/CreatePermission";

beforeAll(async ()=> {
  await Database.connect();
})

afterAll(async ()=> {
  await Database.disconnect();
})

afterEach(async ()=> {
  await Database.cleanup();
})

describe("GetPermissions", ()=> {
  describe("when there are permissions", ()=> {
    it("should return a array with two permissions", async ()=> {
      // Arrange
      const mockPermission1 = createMockPermission();
      const mockPermission2 = createMockPermission();

      await CreatePermission.execute({
        name: mockPermission1.name,
        value: mockPermission1.value
      })

      await CreatePermission.execute({
        name: mockPermission2.name,
        value: mockPermission2.value
      })

      // Act
      const { permissions } = await GetPermissions.execute({});

      // Assert
      expect(permissions.length).toBe(2);
    })
  })

  describe("when the next page there are not permissions", ()=> {
    it("should return a empty array", async ()=> {
      // Arrange
      const mockPermission1 = createMockPermission();
      const mockPermission2 = createMockPermission();

      await CreatePermission.execute({
        name: mockPermission1.name,
        value: mockPermission1.value
      })

      await CreatePermission.execute({
        name: mockPermission2.name,
        value: mockPermission2.value
      })

      // Act
      const { permissions } = await GetPermissions.execute({page: 50});

      // Assert
      expect(permissions.length).toBe(0);
    })
  })

  describe("when there are not permissions", ()=> {
    it("should return a empty array", async ()=> {
      // Act
      const { permissions } = await GetPermissions.execute({});

      // Assert
      expect(permissions.length).toBe(0);
    })
  })
})
