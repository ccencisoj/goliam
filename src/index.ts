import "dotenv/config";
import mongoose from "mongoose";
import express, { Router } from "express";
import { GetUsersController } from "./useCases/GetUsers/GetUsersController";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { DeleteUserController } from "./useCases/DeleteUser/DeleteUserController";
import { UpdateUserController } from "./useCases/UpdateUser/UpdateUserController";
import { GetUserDetailsController } from "./useCases/GetUserDetails/GetUserDetailsController";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

(async ()=> {
  const server = express();

  const apiRouter = Router();

  apiRouter.use(express.json());

  apiRouter.get("/users", GetUsersController.execute);
  apiRouter.get("/users/:id", GetUserDetailsController.execute);
  apiRouter.post("/users", CreateUserController.execute);
  apiRouter.put("/users/:id", UpdateUserController.execute);
  apiRouter.delete("/users/:id", DeleteUserController.execute);

  server.use("/api", apiRouter);

  mongoose.set("strictQuery", false);

  await mongoose.connect(MONGO_URI);

  server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
  })
})()
