import { DeleteUserDTO } from "./DeleteUserDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { UserRepository } from "../../repositories/UserRepository";
import { NoFoundException } from "../../exceptions/NoFoundException";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";
import { validateId } from "../../validators/validateId";

type Response = Promise<void>;

export class DeleteUser {
  public static execute = async (req: DeleteUserDTO): Response => {
    const validationResult = ValidationResult.combine([
      validateId(req.userId)
    ])

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const deleteUserPermission = `DeleteUser`;
    const hasDeleteUserPermission = hasPermission(req.token, deleteUserPermission);

    if(!hasDeleteUserPermission) {
      throw new RequiredPermissionException(deleteUserPermission);
    }

    const user = await UserRepository.findOne({id: req.userId});
    const userFound = !!user;

    if(!userFound) {
      throw new NoFoundException("User no found");
    }

    await UserRepository.delete(user);
  }
}
