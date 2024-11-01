const { default: mongoose } = require("mongoose");

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  console.log("connect to DB");
}
export default connectDB;
