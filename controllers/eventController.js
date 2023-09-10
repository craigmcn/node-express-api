import { Event } from "../models/event.js";

const createEvent = async (req, res) => {
  try {
    if (req.body.id >= 0) {
      res.status(400).json({ error: { message: "Value for `id` is not allowed when creating Event." } });
      return;
    }

    const event = new Event({
      type: req.body.type,
      public: req.body.public,
      repo_id: req.body.repo_id,
      actor_id: req.body.actor_id
    });

    const result = await event.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEventsByUserId = async (req, res) => {
  try {
    const events = await Event.find({
      actor_id: req.params.user_id
    });

    res.json(events);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEventsByRepoId = async (req, res) => {
  try {
    const events = await Event.find({
      repo_id: req.params.repo_id
    });

    res.json(events);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEventByEventId = async (req, res) => {
  try {
    const events = await Event.find({
      id: req.params.event_id
    });

    if (events.length === 0) {
      res.status(404).json({ error: { message: "Event does not exist." } });
      return;
    }

    res.json(events);
  } catch (error) {
    res.status(400).json(error);
  }
};

export { createEvent, getAllEvents, getEventsByRepoId, getEventByEventId, getEventsByUserId };
