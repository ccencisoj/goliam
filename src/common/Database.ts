import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export class Database {
  public static connect = async ()=> {
    await mongoose.connect(process.env.MONGO_URL);
  }

  public static disconnect = async ()=> {
    await mongoose.connection.close();
  }

  public static cleanup = async ()=> {
    if(process.env.NODE_ENV === "test") {
      await mongoose.connection.db.dropDatabase();
    }
  }
}
