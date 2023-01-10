import { User } from "../../entities/User";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { hasPermission } from "../../helpers/hasPermission";
import { ValidationResult } from "../../common/ValidationResult";
import { UserRepository } from "../../repositories/UserRepository";
import { validateUserName } from "../../validators/validateUserName";
import { NoFoundException } from "../../exceptions/NoFoundException";
import { validateUserEmail } from "../../validators/validateUserEmail";
import { ValidationException } from "../../exceptions/ValidationException";
import { AlreadyExistsException } from "../../exceptions/AlreadyExistsException";
import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

type Response = Promise<void>;

export class UpdateUser {
  public static execute = async (req: UpdateUserDTO): Response => {
    const validationResult = ValidationResult.combine([
      validateUserName(req.username),
      validateUserEmail(req.email)
    ])

    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    const updateUserPermission = `UpdateUser`;
    const hasUpdateUserPermission = hasPermission(req.token, updateUserPermission);

    if(!hasUpdateUserPermission) {
      throw new RequiredPermissionException(updateUserPermission);
    }

    const user = await UserRepository.findOne({id: req.userId});
    const userFound = !!user;

    if(!userFound) {
      throw new NoFoundException("User no found");
    }

    if(req.username && !(req.username === user.username)) {
      const usernameAlreadyExists = await UserRepository.findOne({username: req.username});

      if(usernameAlreadyExists) {
        throw new AlreadyExistsException(`Username '${req.username}' already exists`);
      }
    }

    if(req.email && !(req.email === user.email)) {
      const emailAlreadyExists = await UserRepository.findOne({email: req.email});

      if(emailAlreadyExists) {
        throw new AlreadyExistsException(`Email '${req.email}' already exists`);
      }
    }

    const updatedUser = {
      id: user.id,
      username: req.username || user.username,
      email: req.email || user.email,
      password: user.password
    } as User;

    await UserRepository.save(updatedUser);
  }
}
