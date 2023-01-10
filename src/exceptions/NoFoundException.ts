import { ApplicationException } from "../common/ApplicationException";

export class NoFoundException extends ApplicationException {
  public constructor(message: string) {
    super("NoFoundException", 400, message);
  }
}
