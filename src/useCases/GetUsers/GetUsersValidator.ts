import { GetUsersDTO } from "./GetUsersDTO";
import { ValidationResult } from "../../common/ValidationResult";

type Response = Promise<ValidationResult>;

export class GetUsersValidator {
  public static validateDTO = async (dto: GetUsersDTO): Response => {
    return ValidationResult.ok();
  }
}
