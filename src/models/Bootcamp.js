import moment from "moment";
import { model, Schema } from "mongoose";
const BootcampSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    minlength: [3, "The bootcamp name must have atleast 3 characters."],
  },
  description: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg",
  },
  category: {
    type: Schema.ObjectId,
    ref: "BootcampCategory",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },
  creator: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  startsAt: {
    type: Number,
    default: moment().valueOf(),
  },
  createdAt: {
    type: Number,
    default: moment().valueOf(),
  },
  updatedAt: Number,
});

export default model("Bootcamp", BootcampSchema);
