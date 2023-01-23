import dotenv from "dotenv-flow";
import express, { Router } from "express";
import { Database } from "./common/Database";
import { GetUsersController } from "./useCases/users/GetUsers/GetUsersController";
import { CreateUserController } from "./useCases/users/CreateUser/CreateUserController";

dotenv.config();

const PORT = process.env.PORT;

(async ()=> {
  const server = express();
  const apiRouter = Router();

  apiRouter.use(express.json());

  apiRouter.get("/users", GetUsersController.execute);
  apiRouter.post("/users", CreateUserController.execute);

  server.use("/api", apiRouter);

  await Database.connect();

  server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
  })
})()
