import NotificationPage from "@/components/templates/notification-page";
import connectDB from "../../../utils/connectDb";
import Notif from "../../../models/Notif";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import User from "../../../models/User";

const Notifications = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = await User.findOne({ phone: session.user.phone });
  if (!user) {
    redirect("/");
  }
  const notifs = await Notif.find({ recieverId: user._id }).sort({
    visibility: 1,
    createdAt: -1,
  });
  return notifs && notifs?.length ? (
    <NotificationPage notifs={JSON.parse(JSON.stringify(notifs))} />
  ) : (
    <div className="p-8 min-h-60 text-gray-700">هیج اعلانی وجود ندارد</div>
  );
};

export default Notifications;
