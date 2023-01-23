import { Permission } from "../../../entities/Permission";
import { validateId } from "../../../validators/validateId";
import { GetPermissionDetailsDTO } from "./GetPermissionDetailsDTO";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { GetPermissionDetailsGuard } from "./GetPermissionDetailsGuard";
import { ValidationException } from "../../../exceptions/ValidationException";
import { PermissionRepository } from "../../../repositories/PermissionRepository";

type Response = Promise<Permission>;

export class GetPermissionDetails {
  public static execute = async (dto: GetPermissionDetailsDTO): Response => {
    // Check permissions
    await GetPermissionDetailsGuard.check(dto);

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

    return permission;
  }
}
