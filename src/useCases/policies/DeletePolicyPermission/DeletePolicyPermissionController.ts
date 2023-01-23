import { Request, Response } from "express";
import { DeletePolicyPermission } from "./DeletePolicyPermission";
import { DeletePolicyPermissionDTO } from "./DeletePolicyPermissionDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class DeletePermissionFromPolicyController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        policyPermissionId: req.params.id
      } as DeletePolicyPermissionDTO;

      await DeletePolicyPermission.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
