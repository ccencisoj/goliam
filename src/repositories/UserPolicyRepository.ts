import { Schema, model } from "mongoose";
import { UserPolicy } from "../entities/UserPolicy";
import { MongoRepository } from "../common/MongoRepository";

const UserPolicySchema = new Schema<UserPolicy>({
  id: {type: String, required: true},
  userId: {type: String, required: true},
  policyId: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const UserPolicyModel = model("UserPolicy", UserPolicySchema);

const searchQuery = (searchValue: string)=> ({});

const options = {limit: 50, searchQuery};

const UserPolicyRepository = new MongoRepository<UserPolicy>(UserPolicyModel, options);

export { UserPolicyRepository };
