import { GetGroupsDTO } from "./GetGroupsDTO";
import { Group } from "../../../entities/Group";
import { GetGroupsGuard } from "./GetGroupsGuard";
import { Pagination } from "../../../common/Pagination";
import { validatePage } from "../../../validators/validatePage";
import { ValidationResult } from "../../../common/ValidationResult";
import { GroupRepository } from "../../../repositories/GroupRepository";
import { ValidationException } from "../../../exceptions/ValidationException";
import { validateSearchValue } from "../../../validators/validateSearchValue";

type Response = Promise<{groups: Group[], pagination: Pagination}>;

export class GetGroups {
  public static execute = async (dto: GetGroupsDTO): Response => {
    // Check permissions
    await GetGroupsGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validatePage(dto.page),
      validateSearchValue(dto.searchValue)
    ])
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Get the groups
    const groups = await GroupRepository.findMany({}, dto.page, dto.searchValue);
    const pagination = await GroupRepository.paginate({}, dto.page, dto.searchValue);

    return { groups, pagination };
  }
}
