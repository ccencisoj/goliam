import { DeleteGroupDTO } from "./DeleteGroupDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class DeleteGroupGuard {
  public static check = async (dto: DeleteGroupDTO): Response => {
    // Check that the token has 'DeleteGroup' permissión
    const deleteGroupPermission = `DeleteGroup`;
    const hasDeleteGroupPermission = await hasPermission(dto.token, deleteGroupPermission);

    if(!hasDeleteGroupPermission) {
      throw new PermissionException(deleteGroupPermission);
    }
  }
}
