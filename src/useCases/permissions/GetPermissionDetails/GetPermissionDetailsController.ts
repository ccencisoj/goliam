import { Request, Response } from "express";
import { GetPermissionDetails } from "./GetPermissionDetails";
import { GetPermissionDetailsDTO } from "./GetPermissionDetailsDTO";
import { PermissionMapper } from "../../../mappers/PermissionMapper";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class GetPermissionDetailsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        permissionId: req.params.id
      } as GetPermissionDetailsDTO;

      const permission = await GetPermissionDetails.execute(reqData);
      const permissionJSON = PermissionMapper.toJSON(permission);

      res.json({permission: permissionJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
