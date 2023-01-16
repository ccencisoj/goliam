import bcrypt from "bcrypt";

export const compareHash = (value: string, hash: string): boolean => {
  return bcrypt.compareSync(value, hash);
}
