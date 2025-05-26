import mongoose from "mongoose";

const { MONGO_URI, MONGO_CFG } = process.env;

if (!MONGO_URI || !MONGO_CFG) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = await mongoose.connect(
      `${MONGO_URI}${process.envMONGO_DB || "test"}${MONGO_CFG}`
    );
  }
  try {
    cached.conn = cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
