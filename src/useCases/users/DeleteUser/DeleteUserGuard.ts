import { DeleteUserDTO } from "./DeleteUserDTO";
import { hasPermission } from "../../../helpers/hasPermission";
import { PermissionException } from "../../../exceptions/PermissionException";

type Response = Promise<void>;

export class DeleteUserGuard {
  public static check = async (dto: DeleteUserDTO): Response => {
    const deleteUserPermission = `DeleteUser/${dto.userId}`;
    const hasDeleteUserPermission = await hasPermission(dto.token, deleteUserPermission);

    if(!hasDeleteUserPermission) {
      throw new PermissionException(`Required permission '${deleteUserPermission}'`);
    }
  }
}
