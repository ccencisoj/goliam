import { Group } from "../../../entities/Group";
import { CreateGroupDTO } from "./CreateGroupDTO";
import { CreateGroupGuard } from "./CreateGroupGuard";
import { generateId } from "../../../helpers/generateId";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { GroupRepository } from "../../../repositories/GroupRepository";
import { validateGroupName } from "../../../validators/validateGroupName";
import { ValidationException } from "../../../exceptions/ValidationException";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";

type Response = Promise<Group>;

export class CreateGroup {
  public static execute = async (dto: CreateGroupDTO): Response => {
    // Check permissions
    await CreateGroupGuard.check(dto);

    // Validate dto values
    const validationResult = validateGroupName(dto.name);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the 'name' is unique
    const nameAlreadyExists = await GroupRepository.findOne({name: dto.name});

    if(nameAlreadyExists) {
      throw new AlreadyExistsException(`Group name '${dto.name}' already exists`);
    }

    // Create the group
    const newGroup = {
      id: generateId(),
      name: dto.name,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      deletedAt: getCurrentDate(),
      isDeleted: false
    } as Group;

    await GroupRepository.save(newGroup);

    // Dispatch integration event
    const createdGroupEvent = new ServiceEvent({
      name: "CreatedGroup",
      data: {group: newGroup}
    })

    ServiceEvents.dispatch(createdGroupEvent);

    return newGroup;
  }
}
