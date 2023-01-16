import { Request, Response } from "express";
import { GetUserDetails } from "./GetUserDetails";
import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class GetUserDetailsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken
      } as GetUserDetailsDTO;

      await GetUserDetails.execute(reqData);

      res.json({success: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
