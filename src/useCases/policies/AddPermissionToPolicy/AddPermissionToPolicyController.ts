import { Request, Response } from "express";
import { AddPermissionToPolicy } from "./AddPermissionToPolicy";
import { AddPermissionToPolicyDTO } from "./AddPermissionToPolicyDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";
import { PolicyPermissionMapper } from "../../../mappers/PolicyPermissionMapper";

export class AddPermissionToPolicyController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        policyId: req.body.policyId,
        permissionId: req.body.permissionId
      } as AddPermissionToPolicyDTO;

      const policyPermission = await AddPermissionToPolicy.execute(reqData);
      const policyPermissionJSON = PolicyPermissionMapper.toJSON(policyPermission);

      res.json({policyPermission: policyPermissionJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
