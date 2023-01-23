import { Schema, model } from "mongoose";
import { Policy } from "../entities/Policy";
import { MongoRepository } from "../common/MongoRepository";

const PolicySchema = new Schema<Policy>({
  id: {type: String, required: true},
  name: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const PolicyModel = model("Policy", PolicySchema);

const searchQuery = (searchValue: string)=> ({});

const options = {limit: 50, searchQuery};

const PolicyRepository = new MongoRepository<Policy>(PolicyModel, options);

export { PolicyRepository };
