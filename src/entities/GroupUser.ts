import { IEntity } from "../common/IEntity";

export interface GroupUser extends IEntity {
  userId: string;
  groupId: string;
}
