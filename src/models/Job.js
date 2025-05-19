import { Schema, model, models } from "mongoose";

const jobSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
      default: "N/A",
    },
    level: {
      default: 0,
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export default models?.Job || model("Job", jobSchema);
