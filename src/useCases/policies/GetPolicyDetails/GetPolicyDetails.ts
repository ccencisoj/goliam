import { Policy } from "../../../entities/Policy";
import { GetPolicyDetailsDTO } from "./GetPolicyDetailsDTO";
import { GetPolicyDetailsGuard } from "./GetPolicyDetailsGuard";
import { ValidationResult } from "../../../common/ValidationResult";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { PolicyRepository } from "../../../repositories/PolicyRepository";
import { ValidationException } from "../../../exceptions/ValidationException";

type Response = Promise<Policy>;

export class GetPolicyDetails {
  public static execute = async (dto: GetPolicyDetailsDTO): Response => {
    // Check permissions
    await GetPolicyDetailsGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([]);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the policy exists
    const policy = await (PolicyRepository.findOne({id: dto.policyId}));
    const policyFound = !!policy;

    if(!policyFound) {
      throw new NoFoundException(`Policy no found`);
    }

    return policy;
  }
}
