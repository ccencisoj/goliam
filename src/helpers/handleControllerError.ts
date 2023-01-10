import { Request, Response } from "express";
import { ApplicationException } from "../common/ApplicationException";

export const handleControllerError = (req: Request, res: Response, error: any)=> {
  if(error instanceof ApplicationException) {
    return res.status(error.code).json({message: error.message});
  }else {
    console.log(error);
    return res.status(500).json({message: "Unknown error"});
  }
}
