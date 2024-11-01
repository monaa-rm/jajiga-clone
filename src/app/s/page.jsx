import SearchPage from "@/components/templates/search-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import User from "../../../models/User";

const SearchSection = async () => {
  const session = await getServerSession(authOptions);
  let liked_items = [];
  if (session) {
   const user = await User.findOne({ phone: session?.user?.phone }).select({
      liked_residances: 1,
    });
    liked_items = user?.liked_residances ?? []
  }else {
     liked_items = JSON.parse(localStorage.getItem("likedResidances")) || [];
  }

  return (
    <div>
      <SearchPage liked_items={JSON.parse(JSON.stringify(liked_items))} />
    </div>
  );
};

export default SearchSection;
