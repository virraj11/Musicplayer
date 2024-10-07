import { MongoClient } from "mongodb";
import dontenv from "dotenv";

dontenv.config();
const connectionString = process.env.MONGODB_URI;

// Create a new MongoClient
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = await client.connect();
conn.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
export default conn;
