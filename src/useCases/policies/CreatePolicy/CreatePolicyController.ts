import { Request, Response } from "express";
import { CreatePolicy } from "./CreatePolicy";
import { CreatePolicyDTO } from "./CreatePolicyDTO";
import { PolicyMapper } from "../../../mappers/PolicyMapper";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class CreatePolicyController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken
      } as CreatePolicyDTO;

      const policy = await CreatePolicy.execute(reqData);
      const policyJSON = PolicyMapper.toJSON(policy);

      res.json({policy: policyJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
