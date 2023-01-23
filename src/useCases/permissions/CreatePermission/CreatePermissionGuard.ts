import { CreatePermissionDTO } from "./CreatePermissionDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class CreatePermissionGuard {
  public static check = async (dto: CreatePermissionDTO): Response => {
    // Check that the token has 'CreatePermission' permissión
    const createPermissionPermission = `CreatePermission`;
    const hasCreatePermissionPermission = await hasPermission(dto.token, createPermissionPermission);

    if(!hasCreatePermissionPermission) {
      throw new PermissionException(createPermissionPermission);
    }
  }
}
