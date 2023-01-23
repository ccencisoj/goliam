import { Request, Response } from "express";
import { UpdatePolicy } from "./UpdatePolicy";
import { UpdatePolicyDTO } from "./UpdatePolicyDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class UpdatePolicyController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        policyId: req.params.policyId,
        name: req.body.name
      } as UpdatePolicyDTO;

      await UpdatePolicy.execute(reqData);

      res.json({updated: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
