import { DeleteUser } from "./DeleteUser";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { DeleteUserValidator } from "./DeleteUserValidator";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

jest.mock("./DeleteUserValidator");
jest.mock("../../helpers/hasPermission");

const mockedDeleteUserValidator = jest.mocked(DeleteUserValidator);
const mockedHasPermission = jest.mocked(hasPermission);

describe("Success", ()=> { })

describe("Failure", ()=> {
  test("Invalid DTO", async ()=> {
    // Failure reason of the DTO validation
    mockedDeleteUserValidator.validateDTO.mockImplementation(()=> {
      return Promise.resolve(ValidationResult.error("Invalid DTO"));
    })
  
    const resultPromise = DeleteUser.execute({} as DeleteUserDTO);

    await expect(resultPromise).rejects.toBeInstanceOf(ValidationException);
  })

  test("Without permissions", async ()=> {
    // Success reason of the DTO validation
    mockedDeleteUserValidator.validateDTO.mockImplementation(()=> {
      return Promise.resolve(ValidationResult.ok());
    })

    // Failure reason of the permissions check
    mockedHasPermission.mockImplementation(()=> {
      return Promise.resolve(false);
    })
  
    const resultPromise = DeleteUser.execute({} as DeleteUserDTO);

    await expect(resultPromise).rejects.toBeInstanceOf(RequiredPermissionException);
  })
})
