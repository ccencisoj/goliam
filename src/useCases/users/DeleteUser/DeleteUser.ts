import { User } from "../../../entities/User";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { DeleteUserGuard } from "./DeleteUserGuard";
import { ServiceEvent } from "../../../common/ServiceEvent";
import { validateId } from "../../../validators/validateId";
import { ServiceEvents } from "../../../common/ServiceEvents";
import { getCurrentDate } from "../../../helpers/getCurrentDate";
import { UserRepository } from "../../../repositories/UserRepository";
import { NoFoundException } from "../../../exceptions/NoFoundException";
import { ValidationException } from "../../../exceptions/ValidationException";

type Response = Promise<void>;

export class DeleteUser {
  public static execute = async (dto: DeleteUserDTO): Response => {
    // Check permissions
    await DeleteUserGuard.check(dto);

    // Validate dto values
    const validationResult = validateId(dto.userId);
    
    if(validationResult.isError) {
      throw new ValidationException(validationResult.error);
    }

    // Verify that the user exists
    const user = await UserRepository.findOne({id: dto.userId});
    const userFound = !!user;

    if(!userFound) {
      throw new NoFoundException(`User no found`);
    }

    const deletedUser = {
      id: user.id,
      type: user.type,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: getCurrentDate(),
      isDeleted: true
    } as User;

    await UserRepository.save(deletedUser);

    // Dispatch integration event
    const deletedUserEvent = new ServiceEvent({
      name: "DeletedUser",
      data: {user: deletedUser}
    })
  
    ServiceEvents.dispatch(deletedUserEvent);
  }
}
