import express from "express";
import connect from "./connection.js";
import { EventRouter } from "./routes/eventRoute.js";

const app = express();

app.use(express.json());
app.use(EventRouter);
connect(); // connect to database

export { app };
