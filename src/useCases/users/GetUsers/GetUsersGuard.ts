import { GetUsersDTO } from "./GetUsersDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetUsersGuard {
  public static check = async (dto: GetUsersDTO): Response => {
    // Check that the token has 'GetUsers' permissión
    const getUsersPermission = `GetUsers`;
    const hasGetUsersPermission = await hasPermission(dto.token, getUsersPermission);

    if(!hasGetUsersPermission) {
      throw new PermissionException(`Required permissión '${getUsersPermission}'`);
    }
  }
}
