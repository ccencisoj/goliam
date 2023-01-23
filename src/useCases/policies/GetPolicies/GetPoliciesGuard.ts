import { GetPoliciesDTO } from "./GetPoliciesDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetPoliciesGuard {
  public static check = async (dto: GetPoliciesDTO): Response => {
    // Check that the token has 'GetPolicies' permissión
    const getPoliciesPermission = `GetPolicies`;
    const hasGetPoliciesPermission = await hasPermission(dto.token, getPoliciesPermission);

    if(!hasGetPoliciesPermission) {
      throw new PermissionException(getPoliciesPermission);
    }
  }
}
