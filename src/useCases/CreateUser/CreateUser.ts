import { CreateUserDTO } from "./CreateUserDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { CreateUserValidator } from "./CreateUserValidator";
import { ValidationException } from "../../exceptions/ValidationException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class CreateUser {
  public static execute = async (dto: CreateUserDTO): Response => {
    const validationResult = await CreateUserValidator.validateDTO(dto);

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const createUserPermission = `CreateUser`;
    const hasCreateUserPermission = await hasPermission(dto.token, createUserPermission);

    if(!hasCreateUserPermission) {
      throw new RequiredPermissionException(createUserPermission);
    }
  }
}
