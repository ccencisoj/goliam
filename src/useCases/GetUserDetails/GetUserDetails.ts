import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class GetUserDetails {
  public static execute = async (req: GetUserDetailsDTO): Response => {
    const validationResult = ValidationResult.combine([]);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const getUserDetailsPermission = `GetUserDetails`;
    const hasGetUserDetailsPermission = await hasPermission(req.token, getUserDetailsPermission);

    if(!hasGetUserDetailsPermission) {
      throw new RequiredPermissionException(getUserDetailsPermission);
    }
  }
}
