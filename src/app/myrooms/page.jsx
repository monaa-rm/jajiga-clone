import MyroomsPage from "@/components/templates/my-rooms";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function generateMetadata({ }) {
  const siteURL = 'http://localhost:3000';
  return {
     title:`اقامتگاه های من`,
     description:`اقامتگاه های من`,
     alternates: {
        canonical: `${siteURL}/myrooms`,
     },
     robots: {
        index: false,
        follow: false,
        nocache: true,
     },
  };
}
const MyRooms = async () => {
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/");
  }
  return <MyroomsPage />;
};

export default MyRooms;
