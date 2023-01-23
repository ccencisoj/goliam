import { GetPermissionsDTO } from "./GetPermissionsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetPermissionsGuard {
  public static check = async (dto: GetPermissionsDTO): Response => {
    // Check that the token has 'GetPermissions' permissión
    const getPermissionsPermission = `GetPermissions`;
    const hasGetPermissionsPermission = await hasPermission(dto.token, getPermissionsPermission);

    if(!hasGetPermissionsPermission) {
      throw new PermissionException(getPermissionsPermission);
    }
  }
}
