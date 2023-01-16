import { IEntity } from "../common/IEntity";

export interface User extends IEntity {
  username: string;
  email: string;
  password: string;
  type: string;
}
