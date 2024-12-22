import NotificationPage from "@/components/templates/notification-page";
import connectDB from "../../../utils/connectDb";
import Notif from "../../../models/Notif";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import User from "../../../models/User";

export async function generateMetadata({ }) {
  const siteURL = 'http://localhost:3000';
  return {
     title:`اعلان ها`,
     description:`اعلان ها`,
     alternates: {
        canonical: `${siteURL}/notifications`,
     },
     robots: {
        index: false,
        follow: false,
        nocache: true,
     },
  };
}
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
