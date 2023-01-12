import { GetUsersDTO } from "./GetUsersDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { GetUsersValidator } from "./GetUsersValidator";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class GetUsers {
  public static execute = async (dto: GetUsersDTO): Response => {
    const validationResult = await GetUsersValidator.validateDTO(dto);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const getUsersPermission = `GetUsers`;
    const hasGetUsersPermission = await hasPermission(dto.token, getUsersPermission);

    if(!hasGetUsersPermission) {
      throw new RequiredPermissionException(getUsersPermission);
    }
  }
}
