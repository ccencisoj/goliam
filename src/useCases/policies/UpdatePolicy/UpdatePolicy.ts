import { Policy } from "../../../entities/Policy";
import { UpdatePolicyDTO } from "./UpdatePolicyDTO";
import { UpdatePolicyGuard } from "./UpdatePolicyGuard";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { validateId } from "../../../validators/validateId";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { PolicyRepository } from "../../../repositories/PolicyRepository";
import { validatePolicyName } from "../../../validators/validatePolicyName";
import { ValidationException } from "../../../exceptions/ValidationException";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";

type Response = Promise<void>;

export class UpdatePolicy {
  public static execute = async (dto: UpdatePolicyDTO): Response => {
    // Check permissions
    await UpdatePolicyGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validateId(dto.policyId),
      dto.name ? validatePolicyName(dto.name) : ValidationResult.ok()
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

    // Verify that the 'name' is unique
    if(dto.name && !(dto.name === policy.name)) {
      const nameAlreadyExists = await PolicyRepository.findOne({name: dto.name});

      if(nameAlreadyExists) {
        throw new AlreadyExistsException(`Policy name '${dto.name}' already exists`);
      }
    }

    // Update the policy
    const updatedPolicy = {
      id: policy.id,
      name: dto.name || policy.name,
      createdAt: policy.createdAt,
      updatedAt: getCurrentDate(),
      deletedAt: policy.deletedAt,
      isDeleted: policy.isDeleted
    } as Policy;

    await PolicyRepository.save(updatedPolicy);

    // Dispatch integration event
    const updatedPolicyEvent = new ServiceEvent({
      name: "UpdatedPolicy",
      data: {policy: updatedPolicy}
    })

    ServiceEvents.dispatch(updatedPolicyEvent);
  }
}
