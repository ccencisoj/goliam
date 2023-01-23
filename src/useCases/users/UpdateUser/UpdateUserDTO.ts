export interface UpdateUserDTO {
  token?: string;
  userId: string;
  type?: string;
  username?: string;
  email?: string;
  password?: string;
  newPassword?: string;
}
