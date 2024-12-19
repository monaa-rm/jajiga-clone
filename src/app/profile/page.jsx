import ProfilePage from "@/components/templates/profile-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDb";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  console.log("1");

  await connectDB();
  const data = await User.findOne({ phone: session?.user?.phone });
  if (!datta) {
    console.log("2");
    redirect("/");
  }
  console.log("3");

  return <ProfilePage user={JSON.parse(JSON.stringify(data))} />;
};

export default Profile;
