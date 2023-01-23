import { Request, Response } from "express";
import { GetPolicyDetails } from "./GetPolicyDetails";
import { GetPolicyDetailsDTO } from "./GetPolicyDetailsDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";
import { PolicyMapper } from "../../../mappers/PolicyMapper";

export class GetPolicyDetailsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        policyId: req.params.id
      } as GetPolicyDetailsDTO;

      const policy = await GetPolicyDetails.execute(reqData);
      const policyJSON = PolicyMapper.toJSON(policy);

      res.json({policy: policyJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
