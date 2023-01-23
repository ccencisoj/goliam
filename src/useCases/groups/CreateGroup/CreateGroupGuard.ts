import { CreateGroupDTO } from "./CreateGroupDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class CreateGroupGuard {
  public static check = async (dto: CreateGroupDTO): Response => {
    // Check that the token has 'CreateGroup' permissión
    const createGroupPermission = `CreateGroup`;
    const hasCreateGroupPermission = await hasPermission(dto.token, createGroupPermission);

    if(!hasCreateGroupPermission) {
      throw new PermissionException(createGroupPermission);
    }
  }
}
