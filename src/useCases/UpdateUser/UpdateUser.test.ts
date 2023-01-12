import { UpdateUser } from "./UpdateUser";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { UpdateUserValidator } from "./UpdateUserValidator";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

jest.mock("./UpdateUserValidator");
jest.mock("../../helpers/hasPermission");

const mockedUpdateUserValidator = jest.mocked(UpdateUserValidator);
const mockedHasPermission = jest.mocked(hasPermission);

describe("Success", ()=> { })

describe("Failure", ()=> {
  test("Invalid DTO", async ()=> {
    // Failure reason of the DTO validation
    mockedUpdateUserValidator.validateDTO.mockImplementation(()=> {
      return Promise.resolve(ValidationResult.error("Invalid DTO"));
    })
  
    const resultPromise = UpdateUser.execute({} as UpdateUserDTO);

    await expect(resultPromise).rejects.toBeInstanceOf(ValidationException);
  })

  test("Without permissions", async ()=> {
    // Success reason of the DTO validation
    mockedUpdateUserValidator.validateDTO.mockImplementation(()=> {
      return Promise.resolve(ValidationResult.ok());
    })

    // Failure reason of the permissions check
    mockedHasPermission.mockImplementation(()=> {
      return Promise.resolve(false);
    })
  
    const resultPromise = UpdateUser.execute({} as UpdateUserDTO);

    await expect(resultPromise).rejects.toBeInstanceOf(RequiredPermissionException);
  })
})
