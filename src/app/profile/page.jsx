import ProfilePage from "@/components/templates/profile-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDb";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/user`,
    { method: "POST", body: JSON.stringify(session.user), cache: "no-store" }
  );
  const data = await res.json();
  if (data.error) redirect("/");
  return <ProfilePage user={JSON.parse(JSON.stringify(data?.data))} />;
};

export default Profile;
