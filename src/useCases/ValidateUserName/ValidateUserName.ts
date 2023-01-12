import { ValidateUserNameDTO } from "./ValidateUserNameDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class ValidateUserName {
  public static execute = async (req: ValidateUserNameDTO): Response => {
    const validationResult = ValidationResult.combine([]);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const validateUserNamePermission = `ValidateUserName`;
    const hasValidateUserNamePermission = await hasPermission(req.token, validateUserNamePermission);

    if(!hasValidateUserNamePermission) {
      throw new RequiredPermissionException(validateUserNamePermission);
    }
  }
}
