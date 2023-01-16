import { UpdateUser } from "./UpdateUser";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { UpdateUserValidator } from "./UpdateUserValidator";
import { ValidationResult } from "../../../common/ValidationResult";
import { ValidationException } from "../../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../../exceptions/RequiredPermissionException";

jest.mock("./UpdateUserValidator");
jest.mock("../../../helpers/hasPermission");

const mockedUpdateUserValidator = jest.mocked(UpdateUserValidator);
const mockedHasPermission = jest.mocked(hasPermission);

test("UpdateUser.execute should throw ValidationException if the dto contain a invalid value", async ()=> {
  // Simulate that the dto contain a invalid value
  mockedUpdateUserValidator.validateDTO.mockImplementation(()=> {
    return Promise.resolve(ValidationResult.error("Invalid DTO"));
  })

  const resultPromise = UpdateUser.execute({} as UpdateUserDTO);

  await expect(resultPromise).rejects.toBeInstanceOf(ValidationException);
})

test("UpdateUser.execute should throw RequiredPermissionException if the token doesn't has 'UpdateUser' permission", async ()=> {
  // Simulate that the dto contain a invalid value
  mockedUpdateUserValidator.validateDTO.mockImplementation(()=> {
    return Promise.resolve(ValidationResult.ok());
  })

  // Simulate that the token doesn't has 'UpdateUser' permission
  mockedHasPermission.mockImplementation(()=> {
    return Promise.resolve(false);
  })

  const resultPromise = UpdateUser.execute({} as UpdateUserDTO);

  await expect(resultPromise).rejects.toBeInstanceOf(RequiredPermissionException);
})
