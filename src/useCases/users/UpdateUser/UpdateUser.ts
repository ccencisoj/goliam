import { User } from "../../../entities/User";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { UpdateUserGuard } from "./UpdateUserGuard";
import { compareHash } from "../../../helpers/compareHash";
import { validateId } from "../../../validators/validateId";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { generateHash } from "../../../helpers/generateHash";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { ValidationResult } from "../../../common/ValidationResult";
import { UserRepository } from "../../../repositories/UserRepository";
import { validateUserName } from "../../../validators/validateUserName";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { validateUserType } from "../../../validators/validateUserType";
import { validateUserEmail } from "../../../validators/validateUserEmail";
import { ValidationException } from "../../../exceptions/ValidationException";
import { validateUserPassword } from "../../../validators/validateUserPassword";
import { CredentialsException } from "../../../exceptions/CredentialsException";
import { AlreadyExistsException } from "../../../exceptions/AlreadyExistsException";

type Response = Promise<void>;

export class UpdateUser {
  public static execute = async (dto: UpdateUserDTO): Response => {
    // Check permissions
    await UpdateUserGuard.check(dto);

    // Validate dto values
    const validationResult = ValidationResult.combine([
      validateId(dto.userId),
      dto.type ? validateUserType(dto.type) : ValidationResult.ok(),
      dto.username ? validateUserName(dto.username) : ValidationResult.ok(),
      dto.email ? validateUserEmail(dto.email) : ValidationResult.ok(),
      dto.password ? validateUserPassword(dto.password) : ValidationResult.ok(),
      dto.newPassword ? validateUserPassword(dto.newPassword) : ValidationResult.ok()
    ])
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the user exists
    const user = await UserRepository.findOne({id: dto.userId});
    const userFound = !!user;

    if(!userFound) {
      throw new NoFoundException("User no found");
    }

    // Verify that the 'username' is unique
    if(dto.username && !(dto.username === user.username)) {
      const usernameAlreadyExists = await UserRepository.findOne({username: dto.username});

      if(usernameAlreadyExists) {
        throw new AlreadyExistsException(`Username '${dto.username}' already exists`);
      }
    }

    // Verify that the 'email' is unique
    if(dto.email && !(dto.email === user.email)) {
      const emailAlreadyExists = await UserRepository.findOne({email: dto.email});

      if(emailAlreadyExists) {
        throw new AlreadyExistsException(`Email '${dto.email}' already exists`);
      }
    }

    let password = user.password;

    // Verify that the 'password' is valid
    if(dto.password && dto.newPassword) {
      const isValidPassword = compareHash(dto.password, user.password);

      if(!isValidPassword) {
        throw new CredentialsException("Password invalid");
      }

      password = generateHash(dto.newPassword);
    }

    // Update user
    const updatedUser = {
      id: user.id,
      type: dto.type || user.type,
      username: dto.username || user.username,
      email: dto.email || user.email,
      password: password,
      createdAt: user.createdAt,
      updatedAt: getCurrentDate(),
      deletedAt: user.deletedAt,
      isDeleted: user.isDeleted
    } as User;

    await UserRepository.save(updatedUser);

    // Dispatch integration event
    const updatedUserEvent = new ServiceEvent({
      name: "UpdatedUser",
      data: {user: updatedUser}
    })

    ServiceEvents.dispatch(updatedUserEvent);
  }
}
