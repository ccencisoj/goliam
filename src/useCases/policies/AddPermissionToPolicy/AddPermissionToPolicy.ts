import { generateId } from "../../../helpers/generateId";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { validateId } from "../../../validators/validateId";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { PolicyPermission } from "../../../entities/PolicyPermission";
import { AddPermissionToPolicyDTO } from "./AddPermissionToPolicyDTO";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { PolicyRepository } from "../../../repositories/PolicyRepository";
import { AddPermissionToPolicyGuard } from "./AddPermissionToPolicyGuard";
import { ValidationException } from "../../../exceptions/ValidationException";
import { PermissionRepository } from "../../../repositories/PermissionRepository";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";
import { PolicyPermissionRepository } from "../../../repositories/PolicyPermissionRepository";

type Response = Promise<PolicyPermission>;

export class AddPermissionToPolicy {
  public static execute = async (dto: AddPermissionToPolicyDTO): Response => {
    // Check permissions
    await AddPermissionToPolicyGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validateId(dto.policyId),
      validateId(dto.permissionId),
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

    // Verify that the permission exists
    const permission = await PermissionRepository.findOne({id: dto.permissionId});
    const permissionFound = !!permission;

    if(!permissionFound) {
      throw new NoFoundException(`Permission no found`);
    }

    // Verify that the permission has not been previously added
    const policyPermission = await PolicyPermissionRepository.findOne({
      policyId: dto.policyId,
      permissionId: dto.permissionId
    })
    const policyPermissionFound = !!policyPermission;

    if(policyPermissionFound) {
      throw new AlreadyExistsException(`Permission has been previously added`);
    }

    // Create policy permission
    const newPolicyPermission = {
      id: generateId(),
      policyId: dto.policyId,
      permissionId: dto.permissionId,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      isDeleted: false
    } as PolicyPermission;

    await PolicyPermissionRepository.save(newPolicyPermission);

    // Dispatch integration event
    const addedPermissionToPolicyEvent = new ServiceEvent({
      name: "AddedPermissionToPolicy",
      data: {policyPermission: newPolicyPermission}
    }) 

    ServiceEvents.dispatch(addedPermissionToPolicyEvent);

    return newPolicyPermission;
  }
}
