import mongoose from "mongoose";

const MONGO_URI = (
  process.env.NODE_ENV === "test" ? 
  "mongodb://localhost:27017/test" : 
  process.env.MONGO_URI
)

export const connectDatabase = async ()=> {
  mongoose.set("strictQuery", false);

  await mongoose.connect(MONGO_URI);
}
