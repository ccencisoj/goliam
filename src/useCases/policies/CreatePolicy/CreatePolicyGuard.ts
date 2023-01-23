import { CreatePolicyDTO } from "./CreatePolicyDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class CreatePolicyGuard {
  public static check = async (dto: CreatePolicyDTO): Response => {
    // Check that the token has 'CreatePolicy' permissión
    const createPolicyPermission = `CreatePolicy`;
    const hasCreatePolicyPermission = await hasPermission(dto.token, createPolicyPermission);

    if(!hasCreatePolicyPermission) {
      throw new PermissionException(createPolicyPermission);
    }
  }
}
