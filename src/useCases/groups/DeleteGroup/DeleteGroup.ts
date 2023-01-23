import { Group } from "../../../entities/Group";
import { DeleteGroupDTO } from "./DeleteGroupDTO";
import { DeleteGroupGuard } from "./DeleteGroupGuard";
import { validateId } from "../../../validators/validateId";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { GroupRepository } from "../../../repositories/GroupRepository";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { ValidationException } from "../../../exceptions/ValidationException";

type Response = Promise<void>;

export class DeleteGroup {
  public static execute = async (dto: DeleteGroupDTO): Response => {
    // Check permissions
    await DeleteGroupGuard.check(dto);

    // Validate dto values
    const validationResult = validateId(dto.groupId);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the group exists
    const group = await GroupRepository.findOne({id: dto.groupId});
    const groupFound = !!group;

    if(!groupFound) {
      throw new NoFoundException(`Group no found`);
    }

    // Delete the group
    const deletedGroup = {
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
      updatedAt: getCurrentDate(),
      deletedAt: getCurrentDate(),
      isDeleted: true
    } as Group;

    await GroupRepository.save(deletedGroup);

    // Dispatch integration event
    const deletedGroupEvent = new ServiceEvent({
      name: "DeletedGroup",
      data: {data: deletedGroup}
    })

    ServiceEvents.dispatch(deletedGroupEvent);
  }
}
