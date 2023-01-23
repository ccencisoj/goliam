import { Schema, model } from "mongoose";
import { GroupUser } from "../entities/GroupUser";
import { MongoRepository } from "../common/MongoRepository";

const GroupUserSchema = new Schema<GroupUser>({
  id: {type: String, required: true},
  userId: {type: String, required: true},
  groupId: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const GroupUserModel = model("GroupUser", GroupUserSchema);

const searchQuery = (searchValue: string)=> ({});

const options = {limit: 50, searchQuery};

const GroupUserRepository = new MongoRepository<GroupUser>(GroupUserModel, options);

export { GroupUserRepository };
