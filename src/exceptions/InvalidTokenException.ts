import { ApplicationException } from "../common/ApplicationException";

export class InvalidTokenException extends ApplicationException {
  public constructor() {
    super("InvalidTokenException", 400, "Invalid token");
  }
}
