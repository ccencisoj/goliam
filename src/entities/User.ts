import { IEntity } from "../common/IEntity";

export interface User extends IEntity { 
  type: string;
  username: string;
  email: string;
  password: string;
}
