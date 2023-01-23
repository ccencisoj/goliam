import { DeletePolicyDTO } from "./DeletePolicyDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class DeletePolicyGuard {
  public static check = async (dto: DeletePolicyDTO): Response => {
    // Check that the token has 'DeletePolicy' permissión
    const deletePolicyPermission = `DeletePolicy`;
    const hasDeletePolicyPermission = await hasPermission(dto.token, deletePolicyPermission);

    if(!hasDeletePolicyPermission) {
      throw new PermissionException(deletePolicyPermission);
    }
  }
}
