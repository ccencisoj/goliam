import { Pagination } from "../../../common/Pagination";
import { validateId } from "../../../validators/validateId";
import { validatePage } from "../../../validators/validatePage";
import { ValidationResult } from "../../../common/ValidationResult";
import { GetPolicyPermissionsDTO } from "./GetPolicyPermissionsDTO";
import { PolicyPermission } from "../../../entities/PolicyPermission";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { GetPolicyPermissionsGuard } from "./GetPolicyPermissionsGuard";
import { PolicyRepository } from "../../../repositories/PolicyRepository";
import { ValidationException } from "../../../exceptions/ValidationException";
import { validateSearchValue } from "../../../validators/validateSearchValue";
import { PolicyPermissionRepository } from "../../../repositories/PolicyPermissionRepository";

type Response = Promise<{policyPermissions: PolicyPermission[], pagination: Pagination}>;

export class GetPolicyPermissions {
  public static execute = async (dto: GetPolicyPermissionsDTO): Response => {
    // Check permissions
    await GetPolicyPermissionsGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validateId(dto.policyId),
      validatePage(dto.page),
      validateSearchValue(dto.searchValue)
    ])
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the policy exists
    const policy = await PolicyRepository.findOne({id: dto.policyId});
    const policyFound = !!policy;

    if(!policyFound) {
      throw new NoFoundException(`Policy no found`);
    }

    // Get policy permissions
    const filter = {policyId: dto.policyId};
    const policyPermissions = await PolicyPermissionRepository.findMany(filter, dto.page, dto.searchValue);
    const pagination = await PolicyPermissionRepository.paginate(filter, dto.page, dto.searchValue);

    return { policyPermissions, pagination };
  }
}
