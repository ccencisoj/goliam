import { generateId } from "../helpers/generateId";
import { getCurrentDate } from "../helpers/getCurrentDate";

type Params = {name: string, data: object};

export class ServiceEvent {
  public readonly id: string;
  public readonly name: string;
  public readonly data: object;
  public readonly createdAt: string;

  public constructor({name, data}: Params) {
    this.id = generateId();
    this.name = name;
    this.data = data;
    this.createdAt = getCurrentDate();
  }
}
