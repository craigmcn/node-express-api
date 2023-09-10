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

    event.save().then((result) => {
      res.status(201).send(result);
    }).catch((error) => {
      // console.error(error);
      res.status(400).json(error);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEventsByUserId = async (req, res) => {
  try {
    Event.find({
      actor_id: req.params.user_id
    }).then(events => {
      res.json(events);
    }).catch((error) => {
      // console.error(error);
      res.status(400).json(error);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllEvents = async (req, res) => {
  try {
    Event.find({}).then(events => {
      res.json(events);
    }).catch((error) => {
      // console.error(error);
      res.status(400).json(error);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEventsByRepoId = async (req, res) => {
  try {
    Event.find({
      repo_id: req.params.repo_id
    }).then(events => {
      res.json(events);
    }).catch((error) => {
      // console.error(error);
      res.status(400).json(error);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEventByEventId = async (req, res) => {
  try {
    Event.find({
      id: req.params.event_id
    }).then(events => {
      if (events.length === 0) {
        res.status(404).json({ error: { message: "Event does not exist." } });
        return;
      }
      res.json(events);
    }).catch((error) => {
      // console.error(error);
      res.status(400).json(error);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createEvent, getAllEvents, getEventsByRepoId, getEventByEventId, getEventsByUserId };
