import { Schema, model, models } from "mongoose";

const courseSchema = new Schema(
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
    code: {
      type: String,
      default: "N/A",
    },
    filepath: {
      type: String,
      default: null,
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

export default models?.Course || model("Course", courseSchema);
