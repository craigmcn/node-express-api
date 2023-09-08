import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import { EventRouter } from "./routes/eventRoute.js";
import './connection.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(EventRouter);

export { app };
