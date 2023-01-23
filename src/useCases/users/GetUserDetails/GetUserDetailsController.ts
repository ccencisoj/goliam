import { Request, Response } from "express";
import { GetUserDetails } from "./GetUserDetails";
import { GetUserDetailsDTO } from "./GetUserDetailsDTO";
import { UserMapper } from "../../../mappers/UserMapper";
import { getTokenFromRequest } from "../../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../../helpers/handleControllerError";

export class GetUserDetailsController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        userId: req.params.id
      } as GetUserDetailsDTO;

      const user = await GetUserDetails.execute(reqData);
      const userJSON = UserMapper.toJSON(user);

      res.json({user: userJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
