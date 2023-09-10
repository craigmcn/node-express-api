import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ["PushEvent", "ReleaseEvent", "WatchEvent"]
  },

  public: {
    type: Boolean,
    required: true
  },

  repo_id: {
    type: Number,
    required: true
  },

  actor_id: {
    type: Number,
    required: true
  }
}, { timestamps: false, versionKey: false });

eventSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const maxSequence = await Event.find({}).sort({ id: -1 }).limit(1).then(events => events[0]?.id);
    doc.id = maxSequence ? maxSequence + 1 : 1;
  }
  next();
});

eventSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  }
});

const Event = mongoose.model("Event", eventSchema);

export { Event };
