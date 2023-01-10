import { User } from "../../entities/User";
import { GetUsersDTO } from "./GetUsersDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { validateSkip } from "../../validators/validateSkip";
import { validateLimit } from "../../validators/validateLimit";
import { ValidationResult } from "../../common/ValidationResult";
import { UserRepository } from "../../repositories/UserRepository";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<User[]>;

export class GetUsers {
  public static execute = async (req: GetUsersDTO): Response => {
    const validationResult = ValidationResult.combine([
      validateSkip(req.skip),
      validateLimit(req.limit)
    ])

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const getUsersPermission = `GetUsers`;
    const hasGetUsersPermission = hasPermission(req.token, getUsersPermission);

    if(!hasGetUsersPermission) {
      throw new RequiredPermissionException(getUsersPermission);
    }

    const users = await UserRepository.findMany({}, req.skip, req.limit);

    return users;
  }
}
