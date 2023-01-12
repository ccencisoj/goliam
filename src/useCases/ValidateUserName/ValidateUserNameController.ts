import { Request, Response } from "express";
import { ValidateUserName } from "./ValidateUserName";
import { ValidateUserNameDTO } from "./ValidateUserNameDTO";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class ValidateUserNameController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken
      } as ValidateUserNameDTO;

      await ValidateUserName.execute(reqData);

      res.json({success: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
