import { Request, Response } from "express";
import { GetPolicies } from "./GetPolicies";
import { GetPoliciesDTO } from "./GetPoliciesDTO";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";
import { PolicyMapper } from "../../../mappers/PolicyMapper";

export class GetPoliciesController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        page: Number(req.query.page),
        searchValue: req.query.search
      } as GetPoliciesDTO;

      const { policies, pagination } = await GetPolicies.execute(reqData);
      const policiesJSON = policies.map((policy)=> PolicyMapper.toJSON(policy));

      res.json({policies: policiesJSON, pagination});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
