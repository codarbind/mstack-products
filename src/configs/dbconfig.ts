/** @format */
import dotenv from "dotenv";
dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeOutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: true,
};

const MONGO = {
  url: process.env.DB_URL,
  options: MONGO_OPTIONS,
};

const config = { mongo: MONGO };

export default config;
