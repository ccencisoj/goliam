import { Policy } from "../../../entities/Policy";
import { GetPoliciesDTO } from "./GetPoliciesDTO";
import { GetPoliciesGuard } from "./GetPoliciesGuard";
import { Pagination } from "../../../common/Pagination";
import { ValidationResult } from "../../../common/ValidationResult";
import { PolicyRepository } from "../../../repositories/PolicyRepository";
import { ValidationException } from "../../../exceptions/ValidationException";

type Response = Promise<{policies: Policy[], pagination: Pagination}>;

export class GetPolicies {
  public static execute = async (dto: GetPoliciesDTO): Response => {
    // Check permissions
    await GetPoliciesGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([]);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Get the policies
    const policies = await PolicyRepository.findMany({}, dto.page, dto.searchValue);
    const pagination = await PolicyRepository.paginate({}, dto.page, dto.searchValue);

    return { policies, pagination };
  }
}
