import { User } from "../entities/User";
import { Schema, model } from "mongoose";
import { MongoRepository } from "./MongoRepository/MongoRepository";

const UserSchema = new Schema<User>({
  id: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const UserModel = model("User", UserSchema);

const UserRepository = new MongoRepository<User>(UserModel);

export { UserRepository };
