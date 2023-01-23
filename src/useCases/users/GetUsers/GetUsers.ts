import { GetUsersDTO } from "./GetUsersDTO";
import { User } from "../../../entities/User";
import { GetUsersGuard } from "./GetUsersGuard";
import { Pagination } from "../../../common/Pagination";
import { ValidationResult } from "../../../common/ValidationResult";
import { UserRepository } from "../../../repositories/UserRepository";
import { ValidationException } from "../../../exceptions/ValidationException";

type Response = Promise<{users: User[], pagination: Pagination}>;

export class GetUsers {
  public static execute = async (dto: GetUsersDTO): Response => {
    // Check permissions
    await GetUsersGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([]);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }
    
    // Get the users
    const users = await UserRepository.findMany({}, dto.page, dto.searchValue);    
    const pagination = await UserRepository.paginate({}, dto.page, dto.searchValue);

    return { users, pagination };
  }
}
