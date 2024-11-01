"use client";
import { useState, useEffect } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";

const Likeresidance = ({ userData, residanceId }) => {
  const [favItem, setFavItem] = useState(
    userData.liked_residances.includes(residanceId)
  );

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedResidances")) || [];
    if (storedLikes.includes(residanceId)) {
      setFavItem(true);
    }
  }, [residanceId]);

  const favHandler = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await fetch(`/api/residance/${id}`, { method: "PATCH" });
      if (res.status == 200) {
        const data = await res.json();
        if (data?.data === true) {
          setFavItem(true);
          addToLocalStorage(id);
        } else {
          setFavItem(false);
          removeFromLocalStorage(id);
        }
      }
    } catch (error) {
      console.log("fav item catch", error);
    }
  };

  const addToLocalStorage = (id) => {
    let likedResidances = JSON.parse(localStorage.getItem("likedResidances")) || [];
    if (!likedResidances.includes(id)) {
      likedResidances.push(id);
      localStorage.setItem("likedResidances", JSON.stringify(likedResidances));
    }
  };

  const removeFromLocalStorage = (id) => {
    let likedResidances = JSON.parse(localStorage.getItem("likedResidances")) || [];
    likedResidances = likedResidances.filter(residanceId => residanceId !== id);
    localStorage.setItem("likedResidances", JSON.stringify(likedResidances));
  };

  return (
    <div className="absolute left-2 lg:left-7 xl:left-32 top-5 z-[400] flex justify-center items-center gap-2">
      <button
        className="p-2 bg-white outline-none hover:bg-gray-200 rounded-lg"
        onClick={(e) => favHandler(e, residanceId)}
        type="button"
      >
        {favItem ? (
          <GoHeartFill className="w-4 h-4 text-red-500" />
        ) : (
          <GoHeart className="w-4 h-4 text-gray-700" />
        )}
      </button>
      <button className="p-2 bg-white hover:bg-gray-200 rounded-lg" type="button">
        <IoShareSocialOutline className="w-4 h-4 text-gray-700" />
      </button>
    </div>
  );
};

export default Likeresidance;
