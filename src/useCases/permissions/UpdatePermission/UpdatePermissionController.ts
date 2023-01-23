import { Request, Response } from "express";
import { UpdatePermission } from "./UpdatePermission";
import { UpdatePermissionDTO } from "./UpdatePermissionDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class UpdatePermissionController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        permissionId: req.params.id,
        name: req.body.name,
        value: req.body.value
      } as UpdatePermissionDTO;

      await UpdatePermission.execute(reqData);

      res.json({updated: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
