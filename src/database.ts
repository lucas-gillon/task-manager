import { MongoClient } from "mongodb";
const MONGODB_URL = process.env.MONGODB_URL || "";

let cachedDb: MongoClient;

export function getDatabase(): Promise<MongoClient> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(MONGODB_URL).then((db) => {
    cachedDb = db;
    return cachedDb;
  });
}
