import { User } from "../entities/User";
import { Schema, model, connection } from "mongoose";
import { MongoRepository } from "../common/MongoRepository";

const UserSchema = new Schema<User>({
  id: {type: String, required: true},
  type: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const UserModel = connection.model("User", UserSchema);

const searchQuery = (searchValue: string)=> ({
  $or: [
    {type: {$regex: `.*${searchValue}.*`, $options: "i"}},
    {username: {$regex: `.*${searchValue}.*`, $options: "i"}},
    {email: {$regex: `.*${searchValue}.*`, $options: "i"}}
  ]
})

const options = {limit: 2, searchQuery};

const UserRepository = new MongoRepository<User>(UserModel, options);

export { UserRepository };
