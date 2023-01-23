import { Policy } from "../../../entities/Policy";
import { CreatePolicyDTO } from "./CreatePolicyDTO";
import { CreatePolicyGuard } from "./CreatePolicyGuard";
import { generateId } from "../../../helpers/generateId";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { PolicyRepository } from "../../../repositories/PolicyRepository";
import { validatePolicyName } from "../../../validators/validatePolicyName";
import { ValidationException } from "../../../exceptions/ValidationException";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";

type Response = Promise<Policy>;

export class CreatePolicy {
  public static execute = async (dto: CreatePolicyDTO): Response => {
    // Check permissions
    await CreatePolicyGuard.check(dto);

    // Validate dto values
    const validationResult = validatePolicyName(dto.name);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the 'name' is unique
    const nameAlreadyExists = !!(await PolicyRepository.findOne({name: dto.name}));
    
    if(nameAlreadyExists) {
      throw new AlreadyExistsException(`Policy name '${dto.name}' already exists`);
    }

    // Create the policy
    const newPolicy = {
      id: generateId(),
      name: dto.name,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      isDeleted: false
    } as Policy;

    await PolicyRepository.save(newPolicy);

    // Dispatch integration event
    const createdPolicyEvent = new ServiceEvent({
      name: "CreatedPolicy",
      data: {policy: newPolicy}
    })

    ServiceEvents.dispatch(createdPolicyEvent);

    return newPolicy;
  }
}
