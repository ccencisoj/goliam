import { ApplicationException } from "../common/ApplicationException";

export class AlreadyExistsException extends ApplicationException {
  public constructor(message: string) {
    super("AlreadyExistsException", 400, message);
  }
}
