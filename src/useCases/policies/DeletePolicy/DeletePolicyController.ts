import { Request, Response } from "express";
import { DeletePolicy } from "./DeletePolicy";
import { DeletePolicyDTO } from "./DeletePolicyDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class DeletePolicyController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        policyId: req.params.id
      } as DeletePolicyDTO;

      await DeletePolicy.execute(reqData);

      res.json({deleted: true});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
