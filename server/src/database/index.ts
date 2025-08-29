import { connect } from "mongoose";
export const connectDatabase = async () => {
  const dbConnectionString = process.env.DB_KEY;
  if (!dbConnectionString) {
    throw new Error("Failed to connect to the MongoDB.");
  }
  try {
    await connect(dbConnectionString);
    console.log("Successfully conntected to MongoDB!");
  } catch (err) {
    console.error(err instanceof Error && err.message);
  }
};
