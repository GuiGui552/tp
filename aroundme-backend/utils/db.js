// const { MongoClient } = require("mongodb");
// const dotenv = require("dotenv");

// dotenv.config();

// let db;

// async function connectDB() {
//   if (db) return db;
//   const client = new MongoClient(process.env.MONGO_URI || "mongodb://localhost:27017");
//   await client.connect();
//   db = client.db(process.env.DB_NAME || "aroundme");
//   console.log("MongoDB connected");
//   return db;
// }

// module.exports = connectDB;

const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
  if (db) return db;

  const uri =
    "mongodb://root:rootpassword@localhost:27017/aroundme?authSource=admin";

  const client = new MongoClient(uri);
  await client.connect();

  db = client.db("aroundme");
  console.log("MongoDB connected with auth");

  return db;
}

module.exports = connectDB;
