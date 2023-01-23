import { UpdateGroupDTO } from "./UpdateGroupDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class UpdateGroupGuard {
  public static check = async (dto: UpdateGroupDTO): Response => {
    // Check that the token has 'UpdateGroup' permissión
    const updateGroupPermission = `UpdateGroup`;
    const hasUpdateGroupPermission = await hasPermission(dto.token, updateGroupPermission);

    if(!hasUpdateGroupPermission) {
      throw new PermissionException(updateGroupPermission);
    }
  }
}
