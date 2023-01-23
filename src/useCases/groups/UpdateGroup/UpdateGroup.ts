import { Group } from "../../../entities/Group";
import { UpdateGroupDTO } from "./UpdateGroupDTO";
import { UpdateGroupGuard } from "./UpdateGroupGuard";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { GroupRepository } from "../../../repositories/GroupRepository";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { validateGroupName } from "../../../validators/validateGroupName";
import { ValidationException } from "../../../exceptions/ValidationException";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";

type Response = Promise<void>;

export class UpdateGroup {
  public static execute = async (dto: UpdateGroupDTO): Response => {
    // Check permissions
    await UpdateGroupGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      dto.name ? validateGroupName(dto.name) : ValidationResult.ok()
    ])
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the group exists
    const group = await GroupRepository.findOne({id: dto.groupId});
    const groupFound = !!group;

    if(!groupFound) {
      throw new NoFoundException(`Group no found`);
    }

    // Verify that the 'name' is unique
    if(dto.name && !(dto.name === group.name)) {
      const nameAlreadyExists = await GroupRepository.findOne({name: dto.name});

      if(nameAlreadyExists) {
        throw new AlreadyExistsException(`Group name '${dto.name}' already exists`);
      }
    }

    // Update the group
    const updatedGroup = {
      id: group.id,
      name: dto.name || group.name,
      createdAt: group.createdAt,
      updatedAt: getCurrentDate(),
      deletedAt: group.deletedAt,
      isDeleted: group.isDeleted
    } as Group;

    await GroupRepository.save(updatedGroup);
    
    // Dispatch integration event
    const updatedGroupEvent = new ServiceEvent({
      name: "UpdatedGroup",
      data: {group: updatedGroup}
    })

    ServiceEvents.dispatch(updatedGroupEvent);
  }
}
