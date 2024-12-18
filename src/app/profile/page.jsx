import ProfilePage from "@/components/templates/profile-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDb";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  console.log("1")
  let user;
  try {
    await connectDB();
     user = await User.findOne({ phone: session?.user?.phone });
    if (!user) {
      console.log("2")
      redirect("/");
    }
    console.log("3")
  } catch (error) {
    console.log("4")
    redirect("/");
  }

  return <ProfilePage user={JSON.parse(JSON.stringify(user))} />;
};

export default Profile;
