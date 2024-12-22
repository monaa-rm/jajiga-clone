import SearchPage from "@/components/templates/search-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDb";


export async function generateMetadata({}) {
  const siteURL = 'http://localhost:3000';
  return {
     title:`جستجو | اجاره ویلا و سوئیت`,
     description:`جستجو | اجاره ویلا و سوئیت`,
     alternates: {
        canonical: `${siteURL}/s`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}
const SearchSection = async () => {
  const session = await getServerSession(authOptions);
  let liked_items = [];
  try {
    await connectDB();
    if (session) {
      const user = await User.findOne({ phone: session?.user?.phone }).select({
        liked_residances: 1,
      });
      liked_items = user?.liked_residances ?? [];
    }
  } catch (error) {
    liked_items = [];
  }

  return (
    <div>
      <SearchPage liked_items={JSON.parse(JSON.stringify(liked_items))} />
    </div>
  );
};

export default SearchSection;
