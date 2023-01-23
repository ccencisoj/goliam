import { Permission } from "../../../entities/Permission";
import { validateId } from "../../../validators/validateId";
import { UpdatePermissionDTO } from "./UpdatePermissionDTO";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { UpdatePermissionGuard } from "./UpdatePermissionGuard";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { ValidationException } from "../../../exceptions/ValidationException";
import { PermissionRepository } from "../../../repositories/PermissionRepository";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";
import { validatePermissionName } from "../../../validators/validatePermissionName";
import { validatePermissionValue } from "../../../validators/validatePermissionValue";

type Response = Promise<void>;

export class UpdatePermission {
  public static execute = async (dto: UpdatePermissionDTO): Response => {
    // Check permissions
    await UpdatePermissionGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validateId(dto.permissionId),
      dto.name ? validatePermissionName(dto.name) : ValidationResult.ok(),
      dto.value ? validatePermissionValue(dto.value) : ValidationResult.ok()
    ])
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Veriry that the permission exists
    const permission = await PermissionRepository.findOne({id: dto.permissionId});
    const permissionFohnd = !!permission;

    if(!permissionFohnd) {
      throw new NoFoundException(`Permission no found`);
    }

    // Verify that the 'name' is unique
    if(dto.name && !(dto.name === permission.name)) {
      const nameAlreadyExists = await PermissionRepository.findOne({name: dto.name});

      if(nameAlreadyExists) {
        throw new AlreadyExistsException(`Permission name '${dto.name}' already exists`);
      }
    }

    // Update the permission
    const updatedPermission = {
      id: permission.id,
      name: dto.name || permission.name,
      value: dto.value || permission.value,
      createdAt: permission.createdAt,
      updatedAt: getCurrentDate(),
      deletedAt: permission.deletedAt,
      isDeleted: permission.isDeleted
    } as Permission;

    await PermissionRepository.save(updatedPermission);

    // Dispatch integration event
    const updatedPermissionEvent = new ServiceEvent({
      name: "UpdatedPermission",
      data: {permission: updatedPermission}
    })

    ServiceEvents.dispatch(updatedPermissionEvent);
  }
}
