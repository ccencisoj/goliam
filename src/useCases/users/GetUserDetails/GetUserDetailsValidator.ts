import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { ValidationResult } from "../../../common/ValidationResult";

type Response = Promise<ValidationResult>;

export class GetUserDetailsValidator {
  public static validateDTO = async (dto: GetUserDetailsDTO): Response => {
    return ValidationResult.ok();
  }
}
