import { UpdatePolicyDTO } from "./UpdatePolicyDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class UpdatePolicyGuard {
  public static check = async (dto: UpdatePolicyDTO): Response => {
    // Check that the token has 'UpdatePolicy' permissión
    const updatePolicyPermission = `UpdatePolicy`;
    const hasUpdatePolicyPermission = await hasPermission(dto.token, updatePolicyPermission);

    if(!hasUpdatePolicyPermission) {
      throw new PermissionException(updatePolicyPermission);
    }
  }
}
