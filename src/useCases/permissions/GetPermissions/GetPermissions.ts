import { Pagination } from "../../../common/Pagination";
import { GetPermissionsDTO } from "./GetPermissionsDTO";
import { Permission } from "../../../entities/Permission";
import { GetPermissionsGuard } from "./GetPermissionsGuard";
import { validatePage } from "../../../validators/validatePage";
import { ValidationResult } from "../../../common/ValidationResult";
import { ValidationException } from "../../../exceptions/ValidationException";
import { validateSearchValue } from "../../../validators/validateSearchValue";
import { PermissionRepository } from "../../../repositories/PermissionRepository";

type Response = Promise<{permissions: Permission[], pagination: Pagination}>;

export class GetPermissions {
  public static execute = async (dto: GetPermissionsDTO): Response => {
    // Check permissions
    await GetPermissionsGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validatePage(dto.page),
      validateSearchValue(dto.searchValue),
    ])
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Get the permissions
    const permissions = await PermissionRepository.findMany({}, dto.page, dto.searchValue);
    const pagination = await PermissionRepository.paginate({}, dto.page, dto.searchValue);

    return { permissions, pagination };
  }
}
