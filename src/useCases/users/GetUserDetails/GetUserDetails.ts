import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { GetUserDetailsValidator } from "./GetUserDetailsValidator";
import { ValidationException } from "../../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class GetUserDetails {
  public static execute = async (dto: GetUserDetailsDTO): Response => {
    const validationResult = await GetUserDetailsValidator.validateDTO(dto);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const getUserDetailsPermission = `GetUserDetails`;
    const hasGetUserDetailsPermission = await hasPermission(dto.token, getUserDetailsPermission);

    if(!hasGetUserDetailsPermission) {
      throw new RequiredPermissionException(getUserDetailsPermission);
    }
  }
}
