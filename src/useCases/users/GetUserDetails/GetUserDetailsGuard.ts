import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class GetUserDetailsGuard {
  public static check = async (dto: GetUserDetailsDTO): Response => {
    // Check that the token has 'GetUserDetails' permissión
    const getUserDetailsPermission = `GetUserDetails/${dto.userId}`;
    const hasGetUserDetailsPermission = await hasPermission(dto.token, getUserDetailsPermission);

    if(!hasGetUserDetailsPermission) {
      throw new PermissionException(`Required permission '${getUserDetailsPermission}'`);
    }
  }
}
