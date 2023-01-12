import { Request, Response } from "express";
import { ValidateUserEmail } from "./ValidateUserEmail";
import { ValidateUserEmailDTO } from "./ValidateUserEmailDTO";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class ValidateUserEmailController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken
      } as ValidateUserEmailDTO;

      await ValidateUserEmail.execute(reqData);

      res.json({success: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
