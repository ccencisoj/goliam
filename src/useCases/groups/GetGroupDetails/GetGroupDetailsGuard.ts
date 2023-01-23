import { GetGroupDetailsDTO } from "./GetGroupDetailsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetGroupDetailsGuard {
  public static check = async (dto: GetGroupDetailsDTO): Response => {
    // Check that the token has 'GetGroupDetails' permissión
    const getGroupDetailsPermission = `GetGroupDetails`;
    const hasGetGroupDetailsPermission = await hasPermission(dto.token, getGroupDetailsPermission);

    if(!hasGetGroupDetailsPermission) {
      throw new PermissionException(getGroupDetailsPermission);
    }
  }
}
