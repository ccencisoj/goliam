import { UpdateUserDTO } from "./UpdateUserDTO";
import { ValidationResult } from "../../../common/ValidationResult";

type Response = Promise<ValidationResult>;

export class UpdateUserValidator {
  public static validateDTO = async (dto: UpdateUserDTO): Response => {
    return ValidationResult.ok();
  }
}
