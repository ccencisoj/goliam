import { GetUsers } from "./GetUsers";
import { GetUsersDTO } from "./GetUsersDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { GetUsersValidator } from "./GetUsersValidator";
import { ValidationResult } from "../../../common/ValidationResult";
import { ValidationException } from "../../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../../exceptions/RequiredPermissionException";

jest.mock("./GetUsersValidator");
jest.mock("../../../helpers/hasPermission");

const mockedGetUsersValidator = jest.mocked(GetUsersValidator);
const mockedHasPermission = jest.mocked(hasPermission);

test("GetUsers.execute should throw ValidationException if the dto contain a invalid value", async ()=> {
  // Simulate that the dto contain a invalid value
  mockedGetUsersValidator.validateDTO.mockImplementation(()=> {
    return Promise.resolve(ValidationResult.error("Invalid DTO"));
  })

  const resultPromise = GetUsers.execute({} as GetUsersDTO);

  await expect(resultPromise).rejects.toBeInstanceOf(ValidationException);
})

test("GetUsers.execute should throw RequiredPermissionException if the token doesn't has 'GetUsers' permission", async ()=> {
  // Simulate that the dto contain a invalid value
  mockedGetUsersValidator.validateDTO.mockImplementation(()=> {
    return Promise.resolve(ValidationResult.ok());
  })

  // Simulate that the token doesn't has 'GetUsers' permission
  mockedHasPermission.mockImplementation(()=> {
    return Promise.resolve(false);
  })

  const resultPromise = GetUsers.execute({} as GetUsersDTO);

  await expect(resultPromise).rejects.toBeInstanceOf(RequiredPermissionException);
})
