import { ValidationResult } from "../../../common/ValidationResult";
import { PolicyPermission } from "../../../entities/PolicyPermission";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { ValidationException } from "../../../exceptions/ValidationException";
import { GetPolicyPermissionDetailsDTO } from "./GetPolicyPermissionDetailsDTO";
import { GetPolicyPermissionDetailsGuard } from "./GetPolicyPermissionDetailsGuard";
import { PolicyPermissionRepository } from "../../../repositories/PolicyPermissionRepository";

type Response = Promise<PolicyPermission>;

export class GetPolicyPermissionDetails {
  public static execute = async (dto: GetPolicyPermissionDetailsDTO): Response => {
    // Check permissions
    await GetPolicyPermissionDetailsGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([]);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the policy permission exists
    const policyPermission = await PolicyPermissionRepository.findOne({id: dto.policyPermissionId});
    const policyPermissionFound = !!policyPermission;

    if(!policyPermissionFound) {
      throw new NoFoundException("Policy permission no found");
    }

    return policyPermission;
  }
}
