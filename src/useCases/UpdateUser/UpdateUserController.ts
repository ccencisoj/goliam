import { UpdateUser } from "./UpdateUser";
import { Request, Response } from "express";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class UpdateUserController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        userId: req.params.id,
        username: req.body.username,
        email: req.body.email
      } as UpdateUserDTO;

      await UpdateUser.execute(reqData);

      res.json({success: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
