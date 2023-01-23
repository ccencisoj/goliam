import { DeleteUser } from "./DeleteUser";
import { Request, Response } from "express";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class DeleteUserController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        userId: req.params.id
      } as DeleteUserDTO;

      await DeleteUser.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
