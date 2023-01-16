import mongoose from "mongoose";

export const disconnectDatabase = async ()=> {

  if(process.env.NODE_ENV === "test") {
    await mongoose.connection.db.dropDatabase();
  }

  await mongoose.disconnect();
}
