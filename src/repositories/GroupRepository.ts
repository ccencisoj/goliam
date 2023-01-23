import { Schema, model } from "mongoose";
import { Group } from "../entities/Group";
import { MongoRepository } from "../common/MongoRepository";

const GroupSchema = new Schema<Group>({
  id: {type: String, required: true},
  name: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const GroupModel = model("Group", GroupSchema);

const searchQuery = (searchValue: string)=> ({});

const options = {limit: 50, searchQuery};

const GroupRepository = new MongoRepository<Group>(GroupModel, options);

export { GroupRepository };
