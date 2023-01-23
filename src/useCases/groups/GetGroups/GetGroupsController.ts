import { Request, Response } from "express";
import { GetGroups } from "./GetGroups";
import { GetGroupsDTO } from "./GetGroupsDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";
import { GroupMapper } from "../../../mappers/GroupMapper";

export class GetGroupsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        page: Number(req.query.page),
        searchValue: req.query.search
      } as GetGroupsDTO;

      const { groups, pagination } = await GetGroups.execute(reqData);
      const groupsJSON = groups.map((group)=> GroupMapper.toJSON(group));

      res.json({groups: groupsJSON, pagination});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
