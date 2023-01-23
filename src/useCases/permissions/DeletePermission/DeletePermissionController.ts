import { Request, Response } from "express";
import { DeletePermission } from "./DeletePermission";
import { DeletePermissionDTO } from "./DeletePermissionDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class DeletePermissionController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        permissionId: req.params.id
      } as DeletePermissionDTO;

      await DeletePermission.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
