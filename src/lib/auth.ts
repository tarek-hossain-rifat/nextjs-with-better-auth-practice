import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const databaseUrl = process.env.BETTER_AUTH_DB_URL;

if (!databaseUrl) {
  throw new Error("BETTER_AUTH_DB_URL is not defined");
}

const client = new MongoClient(databaseUrl);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
});
