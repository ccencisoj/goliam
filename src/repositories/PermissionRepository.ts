import { Schema, model } from "mongoose";
import { Permission } from "../entities/Permission";
import { MongoRepository } from "../common/MongoRepository";

const PermissionSchema = new Schema<Permission>({
  id: {type: String, required: true},
  name: {type: String, required: true},
  value: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const PermissionModel = model("Permission", PermissionSchema);

const searchQuery = (searchValue: string)=> ({});

const options = {limit: 50, searchQuery};

const PermissionRepository = new MongoRepository<Permission>(PermissionModel, options);

export { PermissionRepository };
