import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

  id : {
    type : Number,
    unique : true,
    required : true,
    autoIncrement: true,
    index : true
  },
  type : {
    type : String,
    required : true
  },

  public : {
    type : Boolean,
    required : true
  },

  repo_id : {
    type : Number,
    required : true
  },

  actor_id : {
    type : Number,
    required : true
  },
}, {timestamps: false, versionKey: false});

eventSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
      delete ret._id;
  },
});

const Event = mongoose.model("Event", eventSchema);

export { Event };
