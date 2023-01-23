import { Request, Response } from "express";
import { DeleteGroup } from "./DeleteGroup";
import { DeleteGroupDTO } from "./DeleteGroupDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class DeleteGroupController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        groupId: req.params.id
      } as DeleteGroupDTO;

      await DeleteGroup.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
