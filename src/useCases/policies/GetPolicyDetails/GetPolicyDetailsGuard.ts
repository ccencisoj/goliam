import { GetPolicyDetailsDTO } from "./GetPolicyDetailsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetPolicyDetailsGuard {
  public static check = async (dto: GetPolicyDetailsDTO): Response => {
    // Check that the token has 'GetPolicyDetails' permissión
    const getPolicyDetailsPermission = `GetPolicyDetails`;
    const hasGetPolicyDetailsPermission = await hasPermission(dto.token, getPolicyDetailsPermission);

    if(!hasGetPolicyDetailsPermission) {
      throw new PermissionException(getPolicyDetailsPermission);
    }
  }
}
