import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCircleUser, FaStar } from "react-icons/fa6";
import { formatNumberToPersian } from "../../../utils/constants";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setPointHome } from "@/store/slices/filterSlice";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SearchResidanceBoxItem = ({ residance, liked_items }) => {
  const { data: session, status } = useSession();
  console.log(liked_items);
  const [favItem, setFavItem] = useState();
  useEffect(() => {
    setFavItem(
      status != "authenticated"
        ? liked_items.includes(residance._id) ||
            JSON.parse(localStorage.getItem("likedResidances"))?.includes(
              residance._id
            )
        : JSON.parse(localStorage.getItem("likedResidances"))?.includes(
            residance._id
          )
    );
  }, [liked_items]);
  const dispatch = useDispatch();
  const addToLocalStorage = (id) => {
    let likedResidances =
      JSON.parse(localStorage.getItem("likedResidances")) || [];
    if (!likedResidances.includes(id)) {
      likedResidances.push(id);
      localStorage.setItem("likedResidances", JSON.stringify(likedResidances));
    }
  };

  const removeFromLocalStorage = (id) => {
    let likedResidances =
      JSON.parse(localStorage.getItem("likedResidances")) || [];
    likedResidances = likedResidances.filter(
      (residanceId) => residanceId !== id
    );
    localStorage.setItem("likedResidances", JSON.stringify(likedResidances));
  };
  const favHandler = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (favItem) {
      setFavItem(false);
    } else {
      setFavItem(true);
    }
    try {
      const res = await fetch(`/api/residance/${id}`, { method: "PATCH" });
      if (res.status == 200) {
        const data = await res.json();
        if (data?.data == "not-logged") {
          if (favItem) {
            removeFromLocalStorage(id);
          } else {
            addToLocalStorage(id);
          }
        } else {
          if (data?.data == true) {
            setFavItem(true);
            addToLocalStorage(id);
          } else {
            setFavItem(false);
          }
          removeFromLocalStorage(id);
        }
      }
    } catch (error) {
      console.log("fav item catch");
    }
  };

  return (
    <Link
      onMouseMove={() => dispatch(setPointHome(residance._id))}
      onMouseLeave={() => dispatch(setPointHome(""))}
      href={`/room/${residance._id}`}
      passHref={true}
      className="relative w-full px-3 md:px-4 lg:px-4 py-4 md:p-4 pb-6 font-[vazirRegular]"
    >
      <div className="w-full h-72 relative">
        <Image
          src={residance?.images[0]}
          alt="image"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="absolute top-[260px] left-6 w-20 h-20">
        {residance?.userId?.image.length ? (
          <div className="relative z-20 border-2 border-white w-20 h-20 rounded-full">
            <Image
              src={residance?.userId?.image}
              alt="image"
              fill
              className="object-cover rounded-full"
            />
          </div>
        ) : (
          <div className="relative z-20 bg-white w-20 h-20 rounded-full">
            <FaCircleUser className="text-gray-200 w-20 h-20" />
          </div>
        )}
      </div>
      <div className="absolute left-5 top-5 flex justify-center items-center gap-2">
        <button
          className="p-2 bg-white outline-none hover:bg-gray-200 rounded-lg"
          onClick={(e) => favHandler(e, residance._id)}
          type="button"
        >
          {favItem ? (
            <GoHeartFill className="w-4 h-4 text-red-500" />
          ) : (
            <GoHeart className="w-4 h-4 text-gray-700" />
          )}
        </button>
        <button
          className="p-2 bg-white hover:bg-gray-200 rounded-lg"
          type="button"
        >
          <IoShareSocialOutline className="w-4 h-4 text-gray-700" />
        </button>
      </div>
      <div className="flex flex-col gap-1 items-start justify-between pt-2">
        <h1 className="text-gray-800 line-clamp-1 w-[80%]">
          اجاره {residance.type_residance.title} در{" "}
          {residance.address.city.name}
        </h1>
        <div className="flex justify-start gap-1 items-center text-start text-gray-500 text-sm">
          <span className="flex">{residance.room} خوابه.</span>
          <span className="flex">{residance.area} متر.</span>
          <span className="flex">تا {residance.max_capacity} مهمان</span>
          <div className="flex items-center gap-[1px]">
            <FaStar className="w-3 h-3 text-yellow-500" />
            {residance.rating}.({residance.rating_number.length} نظر)
          </div>
        </div>
        <span className="text-sm text-gray-600 text-start">
          هر شب از{" "}
          {residance.price.holidays > residance.price.notHolidays
            ? formatNumberToPersian(residance.price.notHolidays)
            : formatNumberToPersian(residance.price.holidays)}
          تومان
        </span>
      </div>
    </Link>
  );
};

export default SearchResidanceBoxItem;
