import { GetUsers } from "./GetUsers";
import { GetUsersDTO } from "./GetUsersDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { GetUsersValidator } from "./GetUsersValidator";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

jest.mock("./GetUsersValidator");
jest.mock("../../helpers/hasPermission");

const mockedGetUsersValidator = jest.mocked(GetUsersValidator);
const mockedHasPermission = jest.mocked(hasPermission);

describe("Success", ()=> { })

describe("Failure", ()=> {
  test("Invalid DTO", async ()=> {
    // Failure reason of the DTO validation
    mockedGetUsersValidator.validateDTO.mockImplementation(()=> {
      return Promise.resolve(ValidationResult.error("Invalid DTO"));
    })
  
    const resultPromise = GetUsers.execute({} as GetUsersDTO);

    await expect(resultPromise).rejects.toBeInstanceOf(ValidationException);
  })

  test("Without permissions", async ()=> {
    // Success reason of the DTO validation
    mockedGetUsersValidator.validateDTO.mockImplementation(()=> {
      return Promise.resolve(ValidationResult.ok());
    })

    // Failure reason of the permissions check
    mockedHasPermission.mockImplementation(()=> {
      return Promise.resolve(false);
    })
  
    const resultPromise = GetUsers.execute({} as GetUsersDTO);

    await expect(resultPromise).rejects.toBeInstanceOf(RequiredPermissionException);
  })
})
