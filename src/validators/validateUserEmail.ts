import { ValidationResult } from "../common/ValidationResult";

export const validateUserEmail = (value: string): ValidationResult => {
  return ValidationResult.ok();
}
