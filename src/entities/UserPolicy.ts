import { IEntity } from "../common/IEntity";

export interface UserPolicy extends IEntity { 
  userId: string;
  policyId: string;
}
