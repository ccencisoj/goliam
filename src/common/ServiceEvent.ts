import { generateId } from "../helpers/generateId";
import { getCurrentDate } from "../helpers/getCurrentDate";

export class ServiceEvent {
  public readonly id: string;
  public readonly name: string;
  public readonly data: object;
  public readonly createdAt: string;

  public constructor(name: string, data: object) {
    this.id = generateId();
    this.name = name;
    this.data = data;
    this.createdAt = getCurrentDate();
  }
}
