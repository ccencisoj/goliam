import { CreateUserDTO } from "./CreateUserDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { RequiredPermissionException } from "../../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class CreateUserGuard {
  public static check = async (dto: CreateUserDTO): Response => {
    // Check that the user has 'CreateUser' permission
    const createUserPermission = `CreateUser`;
    const hasCreateUserPermission = await hasPermission(dto.token, createUserPermission);

    if(!hasCreateUserPermission) {
      throw new RequiredPermissionException(createUserPermission);
    }

    // Check that the user has 'CreateUserType/<type>' permission
    const createUserTypePermission = `CreateUser/Type/${dto.type}`;
    const hasCreateUserTypePermission = await hasPermission(dto.token, createUserTypePermission);

    if(!hasCreateUserTypePermission) {
      throw new RequiredPermissionException(createUserTypePermission);
    }
  }
}
