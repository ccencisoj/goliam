import { CreateUser } from "./CreateUser";
import { Request, Response } from "express";
import { CreateUserDTO } from "./CreateUserDTO";
import { UserMapper } from "../../mappers/UserMapper";
import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
import { handleControllerError } from "../../helpers/handleControllerError";

export class CreateUserController {
  public static execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const reqToken = getTokenFromRequest(req);

      const reqData = {
        token: reqToken,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      } as CreateUserDTO;

      const user = await CreateUser.execute(reqData);
      const userJSON = UserMapper.toJSON(user);

      res.json({user: userJSON});

    }catch(error) {
      handleControllerError(req, res, error);
    }
  }
}
