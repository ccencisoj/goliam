import { Schema, model } from "mongoose";
import { GroupPolicy } from "../entities/GroupPolicy";
import { MongoRepository } from "../common/MongoRepository";

const GroupPolicySchema = new Schema<GroupPolicy>({
  id: {type: String, required: true},
  groupId: {type: String, required: true},
  policyId: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const GroupPolicyModel = model("GroupPolicy", GroupPolicySchema);

const searchQuery = (searchValue: string)=> ({});

const options = {limit: 50, searchQuery};

const GroupPolicyRepository = new MongoRepository<GroupPolicy>(GroupPolicyModel, options);

export { GroupPolicyRepository };
