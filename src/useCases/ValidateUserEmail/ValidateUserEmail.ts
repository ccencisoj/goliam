import { ValidateUserEmailDTO } from "./ValidateUserEmailDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class ValidateUserEmail {
  public static execute = async (req: ValidateUserEmailDTO): Response => {
    const validationResult = ValidationResult.combine([]);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const validateUserEmailPermission = `ValidateUserEmail`;
    const hasValidateUserEmailPermission = await hasPermission(req.token, validateUserEmailPermission);

    if(!hasValidateUserEmailPermission) {
      throw new RequiredPermissionException(validateUserEmailPermission);
    }
  }
}
