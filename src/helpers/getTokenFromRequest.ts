import { Request } from "express";
import { RequiredTokenException } from "../exceptions/RequiredTokenException";

export const getTokenFromRequest = (req: Request)=> {
  const authorizationHeader = req.headers["authorization"] || "";

  if(authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.slice(7);
  }else {
    throw new RequiredTokenException();
  }
}
