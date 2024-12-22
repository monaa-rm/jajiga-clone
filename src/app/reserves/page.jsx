import connectDB from "../../../utils/connectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Room from "../../../models/Room";
import User from "../../../models/User";
import { redirect } from "next/navigation";
import ReservesPage from "@/components/templates/reservespage";
export async function generateMetadata({ }) {
  const siteURL = 'http://localhost:3000';
  return {
     title:`رزرو ها`,
     description:`رزرو ها`,
     alternates: {
        canonical: `${siteURL}/reserves`,
     },
     robots: {
        index: false,
        follow: false,
        nocache: true,
     },
  };
}
const Reserves = async () => {
  await connectDB();
  let data = [];
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = await User.findOne({ phone: session.user.phone });
  if (!user) {
    redirect("/");
  }
  const rooms = await Room.find({ "reservedDays.reservedBy" :user._id.toString() }).populate("userId");
 
  return <ReservesPage rooms={JSON.parse(JSON.stringify(rooms))} userId={JSON.parse(JSON.stringify(user._id))} />;
};

export default Reserves;
