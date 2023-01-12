import { ValidateSkipDTO } from "./ValidateSkipDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class ValidateSkip {
  public static execute = async (req: ValidateSkipDTO): Response => {
    const validationResult = ValidationResult.combine([]);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const validateSkipPermission = `ValidateSkip`;
    const hasValidateSkipPermission = await hasPermission(req.token, validateSkipPermission);

    if(!hasValidateSkipPermission) {
      throw new RequiredPermissionException(validateSkipPermission);
    }
  }
}
