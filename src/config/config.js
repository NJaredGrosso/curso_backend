import dotenv from "dotenv";
import { PERSISTENCIA } from "../constants/constants.js";
dotenv.config();

export default {
	mongo_uri: process.env.MONGO_URI || null,
	port: process.env.PORT || 3000,
	persistencia: process.env.PERSISTENCIA || PERSISTENCIA.MONGO,
	entorno: process.env.ENTORNO || "development",
};
