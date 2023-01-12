import { CreateUserDTO } from "./CreateUserDTO";
import { ValidationResult } from "../../common/ValidationResult";

type Response = Promise<ValidationResult>;

export class CreateUserValidator {
  public static validateDTO = async (dto: CreateUserDTO): Response => {
    return ValidationResult.ok();
  }
}
