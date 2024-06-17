import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./models/index.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const app = express();
app.set("port", process.env.PORT);
app.use()