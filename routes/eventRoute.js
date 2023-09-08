import { Router } from "express";
import { createEvent,getAllEvents,getEventByRepoId,getEventByEventId,getEventsByUserId } from "../controllers/eventController.js";
const EventRouter = Router();



export { EventRouter };
