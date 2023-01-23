import { ServiceEvent } from "../../../common/ServiceEvent";
import { validateId } from "../../../validators/validateId";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { PolicyPermission } from "../../../entities/PolicyPermission";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { DeletePolicyPermissionDTO } from "./DeletePolicyPermissionDTO";
import { DeletePolicyPermissionGuard } from "./DeletePolicyPermissionGuard";
import { ValidationException } from "../../../exceptions/ValidationException";
import { PolicyPermissionRepository } from "../../../repositories/PolicyPermissionRepository";

type Response = Promise<void>;

export class DeletePolicyPermission {
  public static execute = async (dto: DeletePolicyPermissionDTO): Response => {
    // Check permissions
    await DeletePolicyPermissionGuard.check(dto);

    // Validate dto values
    const validationResult = validateId(dto.policyPermissionId);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the policy permission exists
    const policyPermission = await PolicyPermissionRepository.findOne({id: dto.policyPermissionId});
    const policyPermissionFound = !!policyPermission;

    if(!policyPermissionFound) {
      throw new NoFoundException(`Policy no found`);
    }

    // Delete policy permission
    const deletedPolicyPermission = {
      id: policyPermission.id,
      policyId: policyPermission.policyId,
      permissionId: policyPermission.permissionId,
      createdAt: policyPermission.createdAt,
      updatedAt: policyPermission.updatedAt,
      deletedAt: getCurrentDate(),
      isDeleted: true
    } as PolicyPermission;
    
    await PolicyPermissionRepository.save(deletedPolicyPermission);

    // Dispatch integration event
    const deletedPolicyPermissionEvent = new ServiceEvent({
      name: "DeletedPolicyPermission",
      data: {policyPermission: deletedPolicyPermission}
    })

    ServiceEvents.dispatch(deletedPolicyPermissionEvent);
  }
}
