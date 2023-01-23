import { Request, Response } from "express";
import { GetPolicyPermissions } from "./GetPolicyPermissions";
import { GetPolicyPermissionsDTO } from "./GetPolicyPermissionsDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";
import { PolicyPermissionMapper } from "../../../mappers/PolicyPermissionMapper";

export class GetPolicyPermissionsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        page: Number(req.query.page),
        policyId: req.query.policyId,
        searchValue: req.query.searchValue
      } as GetPolicyPermissionsDTO;

      const { policyPermissions, pagination } = await GetPolicyPermissions.execute(reqData);
      const policyPermissionsJSON = policyPermissions.map((policyPermission)=> {
        return PolicyPermissionMapper.toJSON(policyPermission)
      })

      res.json({policyPermissions: policyPermissionsJSON, pagination});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
