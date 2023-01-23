import { Request, Response } from "express";
import { CreatePermission } from "./CreatePermission";
import { CreatePermissionDTO } from "./CreatePermissionDTO";
import { PermissionMapper } from "../../../mappers/PermissionMapper";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class CreatePermissionController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        name: req.body.name,
        value: req.body.value
      } as CreatePermissionDTO;

      const permission = await CreatePermission.execute(reqData);
      const permissionJSON = PermissionMapper.toJSON(permission);

      res.json({permission: permissionJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
