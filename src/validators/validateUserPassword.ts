import { ValidationResult } from "../common/ValidationResult";

export const validateUserPassword = (value: string): ValidationResult => {
  return ValidationResult.ok();
}
