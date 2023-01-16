import { UpdateUserDTO } from "./UpdateUserDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { UpdateUserValidator } from "./UpdateUserValidator";
import { ValidationException } from "../../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class UpdateUser {
  public static execute = async (dto: UpdateUserDTO): Response => {
    const validationResult = await UpdateUserValidator.validateDTO(dto);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const updateUserPermission = `UpdateUser`;
    const hasUpdateUserPermission = await hasPermission(dto.token, updateUserPermission);

    if(!hasUpdateUserPermission) {
      throw new RequiredPermissionException(updateUserPermission);
    }
  }
}
