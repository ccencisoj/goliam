import { Request, Response } from "express";
import { ValidateLimit } from "./ValidateLimit";
import { ValidateLimitDTO } from "./ValidateLimitDTO";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class ValidateLimitController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken
      } as ValidateLimitDTO;

      await ValidateLimit.execute(reqData);

      res.json({success: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
