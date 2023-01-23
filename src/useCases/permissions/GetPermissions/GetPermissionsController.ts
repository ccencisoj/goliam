import { Request, Response } from "express";
import { GetPermissions } from "./GetPermissions";
import { GetPermissionsDTO } from "./GetPermissionsDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";
import { PermissionMapper } from "../../../mappers/PermissionMapper";

export class GetPermissionsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        page: Number(req.query.page),
        searchValue: req.query.search
      } as GetPermissionsDTO;

      const { permissions, pagination } = await GetPermissions.execute(reqData);
      const permissionsJSON = permissions.map((permission)=> PermissionMapper.toJSON(permission));

      res.json({permissions: permissionsJSON, pagination});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
