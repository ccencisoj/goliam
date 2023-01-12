import { ValidateUserPasswordDTO } from "./ValidateUserPasswordDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class ValidateUserPassword {
  public static execute = async (req: ValidateUserPasswordDTO): Response => {
    const validationResult = ValidationResult.combine([]);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const validateUserPasswordPermission = `ValidateUserPassword`;
    const hasValidateUserPasswordPermission = await hasPermission(req.token, validateUserPasswordPermission);

    if(!hasValidateUserPasswordPermission) {
      throw new RequiredPermissionException(validateUserPasswordPermission);
    }
  }
}
