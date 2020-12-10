import moment from "moment";
import { model, Schema } from "mongoose";

const ReviewSchema = new Schema({
  text: {
    type: String,
    required: [true, "Please add a name"],
  },
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 3,
  },
  creator: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  bootcamp: {
    type: Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  createdAt: {
    type: Number,
    default: moment().valueOf(),
  },
});

export default model("Review", ReviewSchema);
