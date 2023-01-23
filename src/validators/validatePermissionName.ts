import { ValidationResult } from "../common/ValidationResult";

export const validatePermissionName = (value: string): ValidationResult => {
  return ValidationResult.ok();
}
