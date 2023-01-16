import { DeleteUserDTO } from "./DeleteUserDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { DeleteUserValidator } from "./DeleteUserValidator";
import { ValidationException } from "../../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class DeleteUser {
  public static execute = async (dto: DeleteUserDTO): Response => {
    const validationResult = await DeleteUserValidator.validateDTO(dto);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const deleteUserPermission = `DeleteUser`;
    const hasDeleteUserPermission = await hasPermission(dto.token, deleteUserPermission);

    if(!hasDeleteUserPermission) {
      throw new RequiredPermissionException(deleteUserPermission);
    }
  }
}
