import { User } from "../../entities/User";
import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { validateId } from "../../validators/validateId";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { UserRepository } from "../../repositories/UserRepository";
import { NoFoundException } from "../../exceptions/NoFoundException";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<User>;

export class GetUserDetails {
  public static execute = async (req: GetUserDetailsDTO): Response => {
    const validationResult = ValidationResult.combine([
      validateId(req.userId)
    ])

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const getUserDetailsPermission = `GetUserDetails`;
    const hasGetUserDetailsPermission = hasPermission(req.token, getUserDetailsPermission);

    if(!hasGetUserDetailsPermission) {
      throw new RequiredPermissionException(getUserDetailsPermission);
    }

    const user = await UserRepository.findOne({id: req.userId});
    const userFound = !!user;

    if(!userFound) {
      throw new NoFoundException("User no found");
    }

    return user;
  }
}
