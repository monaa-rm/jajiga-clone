import { model, models, Schema } from "mongoose";
import User from "./User";

const RoomSchema = new Schema({
  isAvalable: {
    type: Boolean,
    default: true,
  },
  pending : {
    type: Boolean,
    default: false,
  },
  address: {
    type: Object,
    required: true,
  },
  location: {
    type: [Number], // [longitude, latitude]
    index: '2dsphere', // افزودن ایندکس جغرافیایی دو بعدی
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  yard: {
    type: Number,
    required: true,
  },
  type_residance: {
    type: Object,
    required: true,
  },

  room: {
    type: Number,
    required: true,
  },
  bedroom: {
    type: [Object],
    required: true,
  },
  exclusive: {
    type: Boolean,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  region: {
    type: Object,
    required: true,
  },
  options: {
    type: [Object],
    required: true,
  },
  checktime: {
    type: Object,
    required: true,
  },
  price: {
    type: Object,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },

  rules: {
    type: Object,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  instanceReserve: {
    type: Boolean,
    default: true,
  },
  reservedDays :  {
    type: [Object],
    default: [],
  },
  disabledPeople: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0
  },
  rating_number: {
    type: [Object],
    default: []
  },
  likeNumber: {
    type: Number,
    default : 0
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Room = models.Room || model("Room", RoomSchema);
export default Room;
