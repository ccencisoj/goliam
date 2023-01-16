import { Schema, model } from "mongoose";
import { User } from "../../entities/User";
import { MongoRepository } from "../../common/MongoRepository";

const UserSchema = new Schema<User>({
  id: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const UserModel = model("User", UserSchema);

const UserRepository = new MongoRepository<User>(UserModel);

export { UserRepository };
