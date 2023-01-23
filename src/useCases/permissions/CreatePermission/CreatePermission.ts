import { generateId } from "../../../helpers/generateId";
import { Permission } from "../../../entities/Permission";
import { CreatePermissionDTO } from "./CreatePermissionDTO";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { CreatePermissionGuard } from "./CreatePermissionGuard";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { ValidationException } from "../../../exceptions/ValidationException";
import { PermissionRepository } from "../../../repositories/PermissionRepository";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";
import { validatePermissionName } from "../../../validators/validatePermissionName";
import { validatePermissionValue } from "../../../validators/validatePermissionValue";

type Response = Promise<Permission>;

export class CreatePermission {
  public static execute = async (dto: CreatePermissionDTO): Response => {
    // Check permissions
    await CreatePermissionGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validatePermissionName(dto.name),
      validatePermissionValue(dto.value)
    ])
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the 'name' is unique
    const nameAlreadyExists = !!(await PermissionRepository.findOne({name: dto.name}));

    if(nameAlreadyExists) {
      throw new AlreadyExistsException(`Permissión name '${dto.name}' already exists`);
    }

    // Create the permission
    const newPermission = {
      id: generateId(),
      name: dto.name,
      value: dto.value,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      isDeleted: false
    } as Permission;

    await PermissionRepository.save(newPermission);

    // Dispatch integration event
    const createdPermissionEvent = new ServiceEvent({
      name: "CreatedPermission",
      data: {permission: newPermission}
    })

    ServiceEvents.dispatch(createdPermissionEvent);

    return newPermission;
  }
}
