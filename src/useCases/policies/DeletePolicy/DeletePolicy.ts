import { Policy } from "../../../entities/Policy";
import { DeletePolicyDTO } from "./DeletePolicyDTO";
import { DeletePolicyGuard } from "./DeletePolicyGuard";
import { validateId } from "../../../validators/validateId";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { PolicyRepository } from "../../../repositories/PolicyRepository";
import { ValidationException } from "../../../exceptions/ValidationException";

type Response = Promise<void>;

export class DeletePolicy {
  public static execute = async (dto: DeletePolicyDTO): Response => {
    // Check permissions
    await DeletePolicyGuard.check(dto);

    // Validate dto values
    const validationResult = validateId(dto.policyId);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the policy exists
    const policy = await PolicyRepository.findOne({id: dto.policyId});
    const policyFound = !!policy;

    if(!policyFound) {
      throw new NoFoundException(`Policy no found`);
    }

    // Delete the policy
    const deletedPolicy = {
      id: policy.id,
      name: policy.name,
      createdAt: policy.createdAt,
      updatedAt: getCurrentDate(),
      deletedAt: getCurrentDate(),
      isDeleted: true
    } as Policy;
    
    await PolicyRepository.save(deletedPolicy);

    // Dispatch integration event
    const deletedPolicyEvent = new ServiceEvent({
      name: "DeletedPolicy",
      data: {policy: deletedPolicy}
    })

    ServiceEvents.dispatch(deletedPolicyEvent);
  }
}
