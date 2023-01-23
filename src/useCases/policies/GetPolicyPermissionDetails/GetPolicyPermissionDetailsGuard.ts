import { GetPolicyPermissionDetailsDTO } from "./GetPolicyPermissionDetailsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetPolicyPermissionDetailsGuard {
  public static check = async (dto: GetPolicyPermissionDetailsDTO): Response => {
    // Check that the token has 'GetPolicyPermissionDetails' permissión
    const getPolicyPermissionDetailsPermission = `GetPolicyPermissionDetails`;
    const hasGetPolicyPermissionDetailsPermission = await hasPermission(dto.token, getPolicyPermissionDetailsPermission);

    if(!hasGetPolicyPermissionDetailsPermission) {
      throw new PermissionException(getPolicyPermissionDetailsPermission);
    }
  }
}
