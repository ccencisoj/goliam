import { ValidateLimitDTO } from "./ValidateLimitDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class ValidateLimit {
  public static execute = async (req: ValidateLimitDTO): Response => {
    const validationResult = ValidationResult.combine([]);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const validateLimitPermission = `ValidateLimit`;
    const hasValidateLimitPermission = await hasPermission(req.token, validateLimitPermission);

    if(!hasValidateLimitPermission) {
      throw new RequiredPermissionException(validateLimitPermission);
    }
  }
}
