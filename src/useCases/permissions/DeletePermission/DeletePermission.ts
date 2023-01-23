import { validateId } from "../../../validators/validateId";
import { Permission } from "../../../entities/Permission";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { DeletePermissionDTO } from "./DeletePermissionDTO";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { DeletePermissionGuard } from "./DeletePermissionGuard";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { ValidationException } from "../../../exceptions/ValidationException";
import { PermissionRepository } from "../../../repositories/PermissionRepository";

type Response = Promise<void>;

export class DeletePermission {
  public static execute = async (dto: DeletePermissionDTO): Response => {
    // Check permissions
    await DeletePermissionGuard.check(dto);

    // Validate dto values
    const validationResult = validateId(dto.permissionId);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the permission exists
    const permission = await PermissionRepository.findOne({id: dto.permissionId});
    const permissionFound = !!permission;

    if(!permissionFound) {
      throw new NoFoundException(`Permission no found`);
    }

    // Delete the permission
    const deletedPermission = {
      id: permission.id,
      name: permission.name,
      value: permission.value,
      createdAt: permission.createdAt,
      updatedAt: getCurrentDate(),
      deletedAt: getCurrentDate(),
      isDeleted: true
    } as Permission;

    await PermissionRepository.save(deletedPermission);

    // Dispatch integration event
    const deletedPermissionEvent = new ServiceEvent({
      name: "DeletedPermission",
      data: {permission: deletedPermission}
    })

    ServiceEvents.dispatch(deletedPermissionEvent);
  }
}
