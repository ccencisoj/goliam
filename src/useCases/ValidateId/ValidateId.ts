import { ValidateIdDTO } from "./ValidateIdDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class ValidateId {
  public static execute = async (req: ValidateIdDTO): Response => {
    const validationResult = ValidationResult.combine([]);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const validateIdPermission = `ValidateId`;
    const hasValidateIdPermission = await hasPermission(req.token, validateIdPermission);

    if(!hasValidateIdPermission) {
      throw new RequiredPermissionException(validateIdPermission);
    }
  }
}
