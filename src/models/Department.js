import { Schema, model, models } from "mongoose";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    jobs: [
      {
        ref: "Job",
        type: Schema.Types.ObjectId,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models?.Department || model("Department", departmentSchema);
