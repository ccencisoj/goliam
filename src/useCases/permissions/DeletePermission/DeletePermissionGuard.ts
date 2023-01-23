import { DeletePermissionDTO } from "./DeletePermissionDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class DeletePermissionGuard {
  public static check = async (dto: DeletePermissionDTO): Response => {
    // Check that the token has 'DeletePermission' permissión
    const deletePermissionPermission = `DeletePermission`;
    const hasDeletePermissionPermission = await hasPermission(dto.token, deletePermissionPermission);

    if(!hasDeletePermissionPermission) {
      throw new PermissionException(deletePermissionPermission);
    }
  }
}
