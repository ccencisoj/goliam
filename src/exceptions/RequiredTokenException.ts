import { ApplicationException } from "../common/ApplicationException";

export class RequiredTokenException extends ApplicationException {
  public constructor() {
    super("RequiredTokenException", 400, "Required token");
  }
}
