import { Request, Response } from "express";
import { UpdateGroup } from "./UpdateGroup";
import { UpdateGroupDTO } from "./UpdateGroupDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class UpdateGroupController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        groupId: req.params.id,
        name: req.body.name
      } as UpdateGroupDTO;

      await UpdateGroup.execute(reqData);

      res.json({updated: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
