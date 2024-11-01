import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCircleUser, FaStar } from "react-icons/fa6";
import { formatNumberToPersian } from "../../../../utils/constants";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setPointHome } from "@/store/slices/filterSlice";
import Link from "next/link";
import { formatPersianDateRange } from "../../../../utils/filter-funcs";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const ReserveItem = ({ residance, userId }) => {
  const [rating, setRating] = useState(0);
  const [rateIsSending, setRateIsSending] = useState(false);
  const [favItem, setFavItem] = useState(
    residance.userId.liked_residances.includes(residance._id)
  );
  const rsrvItems =
    residance?.reservedDays?.filter((item) => item.reservedBy == userId) || [];
  const dispatch = useDispatch();
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  useEffect(() => {
    const userRating = residance?.rating_number?.find(
      (rating) => rating.userId === userId
    );
    
    if (userRating) {
      setRating(userRating.rateNumber);
    }
  }, [residance, userId]);

  const rateHandler = async (selectedValue) => {
    setRating(selectedValue);
    setRateIsSending(true);

    if (!rateIsSending) {
      try {
        const res = await fetch(`/api/residance/rating/${residance._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, rateNumber: selectedValue }),
        });
        if (res.status == 200) {
          setRateIsSending(false);
        }
      } catch (error) {
        setRateIsSending(false);
      }
    }
  };

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

    try {
      const res = await fetch(`/api/residance/${id}`, { method: "PATCH" });
      if (res.status == 200) {
        const data = await res.json();
        if (data?.data == true) {
          setFavItem(true);
          addToLocalStorage(id);
        } else {
          setFavItem(false);
          removeFromLocalStorage(id);
        }
      }
    } catch (error) {
      console.log("fav item catch");
    }
  };

  return (
    <div className="relative w-full py-4 md:p-4 pb-6 font-[vazirRegular]">
      <Link
        onMouseMove={() => dispatch(setPointHome(residance._id))}
        onMouseLeave={() => dispatch(setPointHome(""))}
        href={`/room/${residance._id}`}
        passHref={true}
        className="w-full h-56"
      >
        <div className="w-full h-56 relative">
          <Image
            src={residance?.images[0]}
            alt="image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </Link>

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
          {residance.type_residance.title} در {residance.address.city.name}
        </h1>
        <div className="flex justify-start gap-1 items-center text-start text-gray-500 text-sm">
          <span className="flex">{residance.room} خوابه.</span>
          <span className="flex">{residance.area} متر.</span>
          <span className="flex">تا {residance.maxCapacity} مهمان</span>
        </div>
        <span className="text-sm text-gray-600 text-start">
          هر شب از{" "}
          {residance.price.holidays > residance.price.notHolidays
            ? formatNumberToPersian(residance.price.notHolidays)
            : formatNumberToPersian(residance.price.holidays)}
          تومان
        </span>
      </div>
      <div dir="ltr" className=" static">
        <Rating
          style={{ maxWidth: 100 }}
          value={rating}
          direction="rtl"
          onChange={ rateHandler}
          itemStyles={myStyles}
        />
      </div>

      <div className="flex flex-col gap-1 text-sm bg-gray-50 rounded-lg py-2 px-1">
        {rsrvItems?.map((days, i) => (
          <div
            key={i}
            className={`py-0.5 px-2 rounded-full ${
              days.acceptMode == "accepted"
                ? "bg-green-200"
                : days.acceptMode == "rejected"
                ? "bg-red-200"
                : "bg-yellow-200"
            }`}
          >
            {formatPersianDateRange([
              days.reservedDays[0],
              days.reservedDays[days.reservedDays.length - 1],
            ])}
            ، {formatNumberToPersian(days.totalCost)} تومان،{" "}
            {days.numberOfGuest} نفر
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReserveItem;
