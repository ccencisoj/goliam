import bcrypt from "bcrypt";

export const generateHash = (value: string): string => {
  return bcrypt.hashSync(value, 8);
}
