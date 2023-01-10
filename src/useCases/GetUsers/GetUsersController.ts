import { GetUsers } from "./GetUsers";
import { Request, Response } from "express";
import { GetUsersDTO } from "./GetUsersDTO";
import { UserMapper } from "../../mappers/UserMapper";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class GetUsersController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        skip: Number(req.query.skip),
        limit: Number(req.query.limit)
      } as GetUsersDTO;

      const users = await GetUsers.execute(reqData);
      const usersJSON = users.map((user)=> UserMapper.toJSON(user));

      res.json({users: usersJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
