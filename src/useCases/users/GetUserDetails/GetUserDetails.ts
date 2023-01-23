import { User } from "../../../entities/User";
import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { GetUserDetailsGuard } from "./GetUserDetailsGuard";
import { ValidationResult } from "../../../common/ValidationResult";
import { UserRepository } from "../../../repositories/UserRepository";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { ValidationException } from "../../../exceptions/ValidationException";

type Response = Promise<User>;

export class GetUserDetails {
  public static execute = async (dto: GetUserDetailsDTO): Response => {
    // Check permissions
    await GetUserDetailsGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([]);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the user exists
    const user = await UserRepository.findOne({id: dto.userId});
    const userFound = !!user;

    if(!userFound) {
      throw new NoFoundException(`User no found`);
    }

    return user;
  }
}
