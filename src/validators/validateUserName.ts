import { ValidationResult } from "../common/ValidationResult";

export const validateUserName = (value: string): ValidationResult => {
  return ValidationResult.ok();
}
