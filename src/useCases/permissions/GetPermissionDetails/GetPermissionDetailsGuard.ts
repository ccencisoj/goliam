import { GetPermissionDetailsDTO } from "./GetPermissionDetailsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetPermissionDetailsGuard {
  public static check = async (dto: GetPermissionDetailsDTO): Response => {
    // Check that the token has 'GetPermissionDetails' permissión
    const getPermissionDetailsPermission = `GetPermissionDetails`;
    const hasGetPermissionDetailsPermission = await hasPermission(dto.token, getPermissionDetailsPermission);

    if(!hasGetPermissionDetailsPermission) {
      throw new PermissionException(getPermissionDetailsPermission);
    }
  }
}
