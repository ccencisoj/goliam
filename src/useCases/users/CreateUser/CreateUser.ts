import { User } from "../../../entities/User";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserGuard } from "./CreateUserGuard";
import { generateId } from "../../../helpers/generateId";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { UserRepository } from "../../../repositories/UserRepository";
import { validateUserName } from "../../../validators/validateUserName";
import { validateUserType } from "../../../validators/validateUserType";
import { validateUserEmail } from "../../../validators/validateUserEmail";
import { ValidationException } from "../../../exceptions/ValidationException";
import { validateUserPassword } from "../../../validators/validateUserPassword";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";

type Response = Promise<User>;

export class CreateUser {
  public static execute = async (dto: CreateUserDTO): Response => {
    // Check permissions
    await CreateUserGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validateUserType(dto.type),
      validateUserName(dto.username),
      validateUserEmail(dto.email),
      validateUserPassword(dto.password)
    ]);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the 'username' is unique
    const usernameAlreadyExists = !!(await UserRepository.findOne({username: dto.username}));

    if(usernameAlreadyExists) {
      throw new AlreadyExistsException(`Username '${dto.username}' already exists`);
    }

    // Verify that the 'email' is unique
    const emailAlreadyExists = !!(await UserRepository.findOne({email: dto.email}));

    if(emailAlreadyExists) {
      throw new AlreadyExistsException(`Email '${dto.email}' already exists`);      
    }

    // Create user
    const newUser = {
      id: generateId(),
      type: dto.type,
      username: dto.username,
      email: dto.email,
      password: dto.password,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      isDeleted: false
    } as User;

    await UserRepository.save(newUser);

    // Dispatch integration event
    const createdUserEvent = new ServiceEvent({
      name: "CreatedUser",
      data: {user: newUser}
    })

    ServiceEvents.dispatch(createdUserEvent);

    return newUser;
  }
}
