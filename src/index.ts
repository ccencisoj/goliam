import "dotenv/config";
import mongoose from "mongoose";
import express, { Router } from "express";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

(async ()=> {
  const server = express();
  const apiRouter = Router();

  apiRouter.use(express.json());

  server.use("/api", apiRouter);

  mongoose.set("strictQuery", false);

  await mongoose.connect(MONGO_URI);

  server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
  })
})()
