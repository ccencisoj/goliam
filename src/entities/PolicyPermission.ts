import { IEntity } from "../common/IEntity";

export interface PolicyPermission extends IEntity { 
  policyId: string;
  permissionId: string;  
}
