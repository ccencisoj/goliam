import { Request, Response } from "express";
import { GetPolicyPermissionDetails } from "./GetPolicyPermissionDetails";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";
import { GetPolicyPermissionDetailsDTO } from "./GetPolicyPermissionDetailsDTO";
import { PolicyPermissionMapper } from "../../../mappers/PolicyPermissionMapper";

export class GetPolicyPermissionDetailsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        policyPermissionId: req.params.id
      } as GetPolicyPermissionDetailsDTO;

      const policyPermission = await GetPolicyPermissionDetails.execute(reqData);
      const policyPermissionJSON = PolicyPermissionMapper.toJSON(policyPermission);

      res.json({policyPermission: policyPermissionJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
