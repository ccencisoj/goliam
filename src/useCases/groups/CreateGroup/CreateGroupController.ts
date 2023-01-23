import { Request, Response } from "express";
import { CreateGroup } from "./CreateGroup";
import { CreateGroupDTO } from "./CreateGroupDTO";
import { GroupMapper } from "../../../mappers/GroupMapper";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class CreateGroupController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        name: req.body.name
      } as CreateGroupDTO;

      const group = await CreateGroup.execute(reqData);
      const groupJSON = GroupMapper.toJSON(group);

      res.json({group: groupJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
