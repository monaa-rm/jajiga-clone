import SingleRoomPage from "@/components/templates/single-room-page";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";
import { getServerSession } from "next-auth";
import User from "../../../../models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function generateMetadata({params}) {
  const data = await Room.findOne({ _id: params.id });
  const siteURL = 'http://localhost:3000';
  return {
     title:`اجاره ${data.type_residance.title} در ${data.address.city.name}`,
     description:`اجاره ${data.type_residance.title} در ${data.address.city.name}`,
     alternates: {
        canonical: `${siteURL}/room/${params.id}`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}

const RoomDetail = async ({ params }) => {
  await connectDB();
  const data = await Room.findOne({ _id: params.id });
  const userData = await User.findOne({ _id: data.userId });
  const userOtherResidances = await Room.find({ userId: data.userId })
    .select({
      _id: 1,
      type_residance: 1,
      images : 1,
      address: 1,
      room: 1,
      area: 1,
      maxCapacity: 1,
      price: 1,
    })
    .limit(7);
    const session = await getServerSession(authOptions);
    let reqId = ""
    if(session){
      reqId = await User.findOne({phone : session.user.phone})
    }
  return (
    <SingleRoomPage
      userData={JSON.parse(JSON.stringify(userData))}
      userOtherResidances={JSON.parse(JSON.stringify(userOtherResidances))}
      data={JSON.parse(JSON.stringify(data))}
      reqId={JSON.parse(JSON.stringify(reqId))}
    />
  );
};

export default RoomDetail;
