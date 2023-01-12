import { Request, Response } from "express";
import { ValidateSkip } from "./ValidateSkip";
import { ValidateSkipDTO } from "./ValidateSkipDTO";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class ValidateSkipController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken
      } as ValidateSkipDTO;

      await ValidateSkip.execute(reqData);

      res.json({success: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
