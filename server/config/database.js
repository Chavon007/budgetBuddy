import mongoose from "mongoose";


async function dbConfig() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
}

export default dbConfig;
