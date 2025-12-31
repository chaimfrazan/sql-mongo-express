import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let mongocClient = null;
let mongoConn = null;

dotenv.config();
export async function initMongoDb() {
  try {
    mongocClient = new MongoClient(process.env.MONGO_URI);
    await mongocClient.connect();
    console.log("connected to mongo db");
    mongoConn = mongocClient.db(process.env.DB_NAME);
    const collection = db.collection("products");
    await collection.createIndex({ name: 1 }, { unique: true });
  } catch (error) {
    console.log(error.message);
  }
}

export async function getMongoDbConnection() {
  if (!mongoConn) {
    if (!mongocClient) {
      mongocClient = new MongoClient(MONGO_URL);
      await mongocClient.connect();
    }
    mongoConn = mongocClient.db(DB_NAME);
  }
  return mongoConn;
}
