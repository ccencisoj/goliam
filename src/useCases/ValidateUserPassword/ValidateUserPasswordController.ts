import { Request, Response } from "express";
import { ValidateUserPassword } from "./ValidateUserPassword";
import { ValidateUserPasswordDTO } from "./ValidateUserPasswordDTO";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class ValidateUserPasswordController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken
      } as ValidateUserPasswordDTO;

      await ValidateUserPassword.execute(reqData);

      res.json({success: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
