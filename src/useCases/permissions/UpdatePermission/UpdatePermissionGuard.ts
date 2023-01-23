import { UpdatePermissionDTO } from "./UpdatePermissionDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class UpdatePermissionGuard {
  public static check = async (dto: UpdatePermissionDTO): Response => {
    // Check that the token has 'UpdatePermission' permissión
    const updatePermissionPermission = `UpdatePermission`;
    const hasUpdatePermissionPermission = await hasPermission(dto.token, updatePermissionPermission);

    if(!hasUpdatePermissionPermission) {
      throw new PermissionException(updatePermissionPermission);
    }
  }
}
