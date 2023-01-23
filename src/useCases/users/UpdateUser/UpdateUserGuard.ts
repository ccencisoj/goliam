import { UpdateUserDTO } from "./UpdateUserDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class UpdateUserGuard {
  public static check = async (dto: UpdateUserDTO): Response => {
    // Check that the token has 'UpdateUser' permissión
    const updateUserPermission = `UpdateUser/${dto.userId}`;
    const hasUpdateUserPermission = await hasPermission(dto.token, updateUserPermission);

    if(!hasUpdateUserPermission) {
      throw new PermissionException(`Required permissión '${updateUserPermission}'`);
    }
  }
}
