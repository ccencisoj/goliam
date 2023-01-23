import { Request, Response } from "express";
import { GetGroupDetails } from "./GetGroupDetails";
import { GetGroupDetailsDTO } from "./GetGroupDetailsDTO";
import { GroupMapper } from "../../../mappers/GroupMapper";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class GetGroupDetailsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        groupId: req.params.id
      } as GetGroupDetailsDTO;

      const group = await GetGroupDetails.execute(reqData);
      const groupJSON = GroupMapper.toJSON(group);

      res.json({group: groupJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
