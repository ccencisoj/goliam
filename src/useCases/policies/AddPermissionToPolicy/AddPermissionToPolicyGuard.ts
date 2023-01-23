import { AddPermissionToPolicyDTO } from "./AddPermissionToPolicyDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class AddPermissionToPolicyGuard {
  public static check = async (dto: AddPermissionToPolicyDTO): Response => {
    // Check that the token has 'AddPermissionToPolicy' permissión
    const addPermissionToPolicyPermission = `AddPermissionToPolicy`;
    const hasAddPermissionToPolicyPermission = await hasPermission(dto.token, addPermissionToPolicyPermission);

    if(!hasAddPermissionToPolicyPermission) {
      throw new PermissionException(addPermissionToPolicyPermission);
    }
  }
}
