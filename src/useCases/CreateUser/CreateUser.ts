import { User } from "../../entities/User";
import { CreateUserDTO } from "./CreateUserDTO";
import { generateId } from "../../helpers/generateId";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { UserRepository } from "../../repositories/UserRepository";
import { validateUserName } from "../../validators/validateUserName";
import { ValidationException } from "../../exceptions/ValidationException";
import { AlreadyExistsException } from "../../exceptions/AlreadyExistsException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<User>;

export class CreateUser {
  public static execute = async (req: CreateUserDTO): Response => {
    const validationResult = ValidationResult.combine([
      validateUserName(req.username),
      validateUserName(req.email),
      validateUserName(req.password)
    ])

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const createUserPermission = `CreateUser`;
    const hasCreateUserPermission = hasPermission(req.token, createUserPermission);

    if(!hasCreateUserPermission) {
      throw new RequiredPermissionException(createUserPermission);
    }

    const usernameAlreadyExists = !!(await UserRepository.findOne({username: req.username}));

    if(usernameAlreadyExists) {
      throw new AlreadyExistsException(`Username '${req.username}' already exists`);
    }

    const emailAlreadyExists = !!(await UserRepository.findOne({email: req.email}));

    if(emailAlreadyExists) {
      throw new AlreadyExistsException(`Email '${req.email}' already exists`);
    }

    const newUser = {
      id: generateId(),
      username: req.username,
      email: req.email,
      password: req.password
    } as User;

    await UserRepository.save(newUser);

    return newUser;
  }
}
