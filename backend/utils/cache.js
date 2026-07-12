import { connectDB } from "../config/db.js";

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

export const getCached = async (key) => {
  try {
    const db = await connectDB();
    const entry = await db.collection("reportCache").findOne({ _id: key });

    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      await db.collection("reportCache").deleteOne({ _id: key });
      return null;
    }
    return entry.data;
  } catch (error) {
    console.error("MongoDB Cache GET Error:", error);
    return null;
  }
};

export const setCached = async (key, data) => {
  try {
    const db = await connectDB();
    await db.collection("reportCache").updateOne(
      { _id: key },
      { $set: { data, timestamp: Date.now() } },
      { upsert: true }
    );
  } catch (error) {
    console.error("MongoDB Cache SET Error:", error);
  }
};