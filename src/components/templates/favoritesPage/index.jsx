"use client";
import FavoriteItem from "@/components/elements/favotiteItem";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-scroll";

const FavoritesPage = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    // دریافت شناسه‌ها از localStorage
    const likedResidances =
      JSON.parse(localStorage.getItem("likedResidances")) || [];
    // ارسال شناسه‌ها به سرور برای دریافت اطلاعات اقامتگاه‌ها
    if (likedResidances.length > 0) {

      fetch("/api/residance/favoriteResidances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: likedResidances }),
      })
        .then((response) => response.json())
        .then((data) => {
          setRooms(data.rooms);
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        });
    }
  }, []);
  return (
    <div className="w-full min-h-full">
      <div
        className={`w-full  h-36 z-0 
         newroom_bg flex justify-start items-start pt-8 px-4 lg:px-28 `}
      >
        <div className={`flex justify-start items-center gap-1 text-gray-800 `}>
          <Link href={"/"}>جاجیگا</Link>
          <FaAngleLeft className="w-3 h-3" />
          <span className="text-lg font-bold">علاقه مندی ها</span>
        </div>
      </div>
      <div
        className={`w-full bg-white  z-1 -mt-4 rounded-tr-2xl rounded-tl-2xl
         px-4 lg:px-28 `}
      >
        {rooms.length ? (
          <div
            className={`w-full pt-8 bg-white rounded-tr-2xl rounded-tl-2xl md:pt-0 md:rounded-none md:bg-none grid grid-cols-1 
       md:grid-cols-3
         
      `}
          >
            {rooms?.map((residance, i) => (
              <FavoriteItem key={i} residance={residance} />
            ))}
          </div>
        ) : (
          <div className="pt-8 pb-40" >
            اقامتگاهی را به لیست علاقه مندی ها اضافه نکرده اید
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
