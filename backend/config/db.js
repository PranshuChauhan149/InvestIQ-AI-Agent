import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
let db;

export const connectDB = async () => {
  if (db) return db;
  await client.connect();
  db = client.db("investmentAgent");
  console.log("MongoDB connected");
  return db;
};
