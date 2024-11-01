import MyroomsPage from "@/components/templates/my-rooms";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const MyRooms = async () => {
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/");
  }
  return <MyroomsPage />;
};

export default MyRooms;
