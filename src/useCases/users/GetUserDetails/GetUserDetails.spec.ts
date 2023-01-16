import { GetUserDetails } from "./GetUserDetails";
import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { GetUserDetailsValidator } from "./GetUserDetailsValidator";
import { ValidationResult } from "../../../common/ValidationResult";
import { ValidationException } from "../../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../../exceptions/RequiredPermissionException";

jest.mock("./GetUserDetailsValidator");
jest.mock("../../../helpers/hasPermission");

const mockedGetUserDetailsValidator = jest.mocked(GetUserDetailsValidator);
const mockedHasPermission = jest.mocked(hasPermission);

test("GetUserDetails.execute should throw ValidationException if the dto contain a invalid value", async ()=> {
  // Simulate that the dto contain a invalid value
  mockedGetUserDetailsValidator.validateDTO.mockImplementation(()=> {
    return Promise.resolve(ValidationResult.error("Invalid DTO"));
  })

  const resultPromise = GetUserDetails.execute({} as GetUserDetailsDTO);

  await expect(resultPromise).rejects.toBeInstanceOf(ValidationException);
})

test("GetUserDetails.execute should throw RequiredPermissionException if the token doesn't has 'GetUserDetails' permission", async ()=> {
  // Simulate that the dto contain a invalid value
  mockedGetUserDetailsValidator.validateDTO.mockImplementation(()=> {
    return Promise.resolve(ValidationResult.ok());
  })

  // Simulate that the token doesn't has 'GetUserDetails' permission
  mockedHasPermission.mockImplementation(()=> {
    return Promise.resolve(false);
  })

  const resultPromise = GetUserDetails.execute({} as GetUserDetailsDTO);

  await expect(resultPromise).rejects.toBeInstanceOf(RequiredPermissionException);
})
