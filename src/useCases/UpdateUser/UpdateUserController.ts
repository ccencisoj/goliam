import { Request, Response } from "express";
import { UpdateUser } from "./UpdateUser";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class UpdateUserController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken
      } as UpdateUserDTO;

      await UpdateUser.execute(reqData);

      res.json({success: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
