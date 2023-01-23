import { hasPermission } from "../../../helpers/hasPermission";
import { DeletePolicyPermissionDTO } from "./DeletePolicyPermissionDTO";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class DeletePolicyPermissionGuard {
  public static check = async (dto: DeletePolicyPermissionDTO): Response => {
    // Check that the token has 'DeletePolicyPermission' permissión
    const deletePolicyPermissionPermission = `DeletePolicyPermission`;
    const hasDeletePolicyPermissionPermission = await hasPermission(dto.token, deletePolicyPermissionPermission);

    if(!hasDeletePolicyPermissionPermission) {
      throw new PermissionException(deletePolicyPermissionPermission);
    }
  }
}
