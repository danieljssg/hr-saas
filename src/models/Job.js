import { Schema, model, models } from "mongoose";

const jobSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "N/A",
    },
    level: {
      default: 0,
      type: Number,
    },
    code: {
      type: String,
      default: "N/A",
    },
    filepath: {
      type: String,
      default: null,
    },
    department: {
      ref: "Department",
      type: Schema.Types.ObjectId,
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
