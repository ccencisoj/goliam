import { GetGroupsDTO } from "./GetGroupsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetGroupsGuard {
  public static check = async (dto: GetGroupsDTO): Response => {
    // Check that the token has 'GetGroups' permissión
    const getGroupsPermission = `GetGroups`;
    const hasGetGroupsPermission = await hasPermission(dto.token, getGroupsPermission);

    if(!hasGetGroupsPermission) {
      throw new PermissionException(getGroupsPermission);
    }
  }
}
