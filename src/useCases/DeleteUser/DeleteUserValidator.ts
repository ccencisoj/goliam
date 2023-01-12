import { DeleteUserDTO } from "./DeleteUserDTO";
import { ValidationResult } from "../../common/ValidationResult";

type Response = Promise<ValidationResult>;

export class DeleteUserValidator {
  public static validateDTO = async (dto: DeleteUserDTO): Response => {
    return ValidationResult.ok();
  }
}
