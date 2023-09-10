import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventsByRepoId,
  getEventByEventId,
  getEventsByUserId
} from "../controllers/eventController.js";

const EventRouter = Router();

EventRouter.get("/events/", getAllEvents);
EventRouter.post("/events/", createEvent);
EventRouter.get("/repos/:repo_id/events/", getEventsByRepoId);
EventRouter.get("/users/:user_id/events/", getEventsByUserId);
EventRouter.get("/events/:event_id/", getEventByEventId);

export { EventRouter };
