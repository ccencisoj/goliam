import { CreateUserDTO } from "./CreateUserDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class CreateUserGuard {
  public static check = async (dto: CreateUserDTO): Response => {
    const createUserPermission = `CreateUser`;
    const hasCreateUserPermission = await hasPermission(dto.token, createUserPermission);

    if(!hasCreateUserPermission) {
      throw new PermissionException(`Required permission '${createUserPermission}'`);
    }

    const setTypePermission = `CreateUser/Type/${dto.type}`;
    const hasSetTypePermission = await hasPermission(dto.token, setTypePermission);

    if(!hasSetTypePermission) {
      throw new PermissionException(`Required permission '${setTypePermission}'`);
    }
  }
}
