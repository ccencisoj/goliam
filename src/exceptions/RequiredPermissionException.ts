import { ApplicationException } from "../common/ApplicationException";

export class RequiredPermissionException extends ApplicationException {
  public constructor(permission: string) {
    super("RequiredPermissionException", 400, `Required permission '${permission}'`);
  }
}
