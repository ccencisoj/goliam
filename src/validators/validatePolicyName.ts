import { ValidationResult } from "../common/ValidationResult";

export const validatePolicyName = (value: string): ValidationResult => {
  return ValidationResult.ok();
}
