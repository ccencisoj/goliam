import { Group } from "../../../entities/Group";
import { GetGroupDetailsDTO } from "./GetGroupDetailsDTO";
import { validateId } from "../../../validators/validateId";
import { GetGroupDetailsGuard } from "./GetGroupDetailsGuard";
import { GroupRepository } from "../../../repositories/GroupRepository";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { ValidationException } from "../../../exceptions/ValidationException";

type Response = Promise<Group>;

export class GetGroupDetails {
  public static execute = async (dto: GetGroupDetailsDTO): Response => {
    // Check permissions
    await GetGroupDetailsGuard.check(dto);

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

    return group;    
  }
}
