import { DeleteUser } from "./DeleteUser";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { DeleteUserValidator } from "./DeleteUserValidator";
import { ValidationResult } from "../../../common/ValidationResult";
import { ValidationException } from "../../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../../exceptions/RequiredPermissionException";

jest.mock("./DeleteUserValidator");
jest.mock("../../../helpers/hasPermission");

const mockedDeleteUserValidator = jest.mocked(DeleteUserValidator);
const mockedHasPermission = jest.mocked(hasPermission);

test("DeleteUser.execute should throw ValidationException if the dto contain a invalid value", async ()=> {
  // Simulate that the dto contain a invalid value
  mockedDeleteUserValidator.validateDTO.mockImplementation(()=> {
    return Promise.resolve(ValidationResult.error("Invalid DTO"));
  })

  const resultPromise = DeleteUser.execute({} as DeleteUserDTO);

  await expect(resultPromise).rejects.toBeInstanceOf(ValidationException);
})

test("DeleteUser.execute should throw RequiredPermissionException if the token doesn't has 'DeleteUser' permission", async ()=> {
  // Simulate that the dto contain a invalid value
  mockedDeleteUserValidator.validateDTO.mockImplementation(()=> {
    return Promise.resolve(ValidationResult.ok());
  })

  // Simulate that the token doesn't has 'DeleteUser' permission
  mockedHasPermission.mockImplementation(()=> {
    return Promise.resolve(false);
  })

  const resultPromise = DeleteUser.execute({} as DeleteUserDTO);

  await expect(resultPromise).rejects.toBeInstanceOf(RequiredPermissionException);
})
