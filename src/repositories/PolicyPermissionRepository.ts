import { Schema, model } from "mongoose";
import { PolicyPermission } from "../entities/PolicyPermission";
import { MongoRepository } from "../common/MongoRepository";

const PolicyPermissionSchema = new Schema<PolicyPermission>({
  id: {type: String, required: true},
  policyId: {type: String, required: true},
  permissionId: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const PolicyPermissionModel = model("PolicyPermission", PolicyPermissionSchema);

const searchQuery = (searchValue: string)=> ({});

const options = {limit: 50, searchQuery};

const PolicyPermissionRepository = new MongoRepository<PolicyPermission>(PolicyPermissionModel, options);

export { PolicyPermissionRepository };
