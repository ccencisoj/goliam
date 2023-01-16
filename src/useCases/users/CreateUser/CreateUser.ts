import { User } from "../../../entities/User";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserGuard } from "./CreateUserGuard";
import { generateId } from "../../../helpers/generateId";
import { generateHash } from "../../../helpers/generateHash";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { ValidationException } from "../../../exceptions/ValidationException";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";
import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { validateUserType } from "../../../validators/validateUserType/validateUserType";
import { validateUsername } from "../../../validators/validateUsername/validateUsername";
import { validateUserEmail } from "../../../validators/validateUserEmail/validateUserEmail";
import { validateUserPassword } from "../../../validators/validateUserPassword/validateUserPassword";

type Response = Promise<User>;

export class CreateUser {
  public static execute = async (dto: CreateUserDTO): Response => {
    // Check permissions
    await CreateUserGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validateUsername(dto.username),
      validateUserEmail(dto.email),
      validateUserPassword(dto.password),
      validateUserType(dto.type)
    ])

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the username is unique
    const usernameAlreadyExists = !!(await UserRepository.findOne({username: dto.username}));

    if(usernameAlreadyExists) {
      throw new AlreadyExistsException(`Username '${dto.username}' already exists`);
    }

    // Verify that the email is unique
    const emailAlreadyExists = !!(await UserRepository.findOne({email: dto.email}));

    if(emailAlreadyExists) {
      throw new AlreadyExistsException(`Email '${dto.email}' already exists`);
    }
      
    const newUser = {
      id: generateId(),
      username: dto.username,
      email: dto.email,
      password: generateHash(dto.password),
      type: dto.type,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      isDeleted: false
    } as User;

    await UserRepository.save(newUser);

    return newUser;
  }
}
