import { GetPolicyPermissionsDTO } from "./GetPolicyPermissionsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetPolicyPermissionsGuard {
  public static check = async (dto: GetPolicyPermissionsDTO): Response => {
    // Check that the token has 'GetPolicyPermissions' permissión
    const getPolicyPermissionsPermission = `GetPolicyPermissions`;
    const hasGetPolicyPermissionsPermission = await hasPermission(dto.token, getPolicyPermissionsPermission);

    if(!hasGetPolicyPermissionsPermission) {
      throw new PermissionException(getPolicyPermissionsPermission);
    }
  }
}
