import { IEntity } from "../common/IEntity";

export interface Permission extends IEntity {
  name: string;
  value: string;
}
