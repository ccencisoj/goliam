import { Request, Response } from "express";
import { UpdateUser } from "./UpdateUser";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class UpdateUserController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        userId: req.params.id,
        type: req.body.type,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        newPassword: req.body.newPassword
      } as UpdateUserDTO;

      await UpdateUser.execute(reqData);

      res.json({updated: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
