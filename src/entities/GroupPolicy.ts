import { IEntity } from "../common/IEntity";

export interface GroupPolicy extends IEntity { 
  groupId: string;
  policyId: string;
}
