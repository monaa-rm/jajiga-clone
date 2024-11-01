import { model, models, Schema } from "mongoose";


const NotifSchema = new Schema({
  text: {
    type: String,
    default: "",
    required: true,
  },
  visibility: {
    type: Boolean,
    default: false,
    required: true,
  },
  type: {
    type: String,
    default: "",
    required: true,
  },
  resId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  recieverId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Notif = models.Notif || model("Notif", NotifSchema);
export default Notif;
