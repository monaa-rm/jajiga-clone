"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  FaAngleLeft,
  FaCircleUser,
  FaPlus,
  FaRegCircleUser,
} from "react-icons/fa6";
import { PiUserCircleThin } from "react-icons/pi";
import ProfileImage from "./profile-image";
import ProfileDetails from "./profileDetails";

const ProfilePage = ({ user }) => {

  return (
    <div className="w-full min-h-full">
      <div
        className={`w-full  h-36 z-0 
           newroom_bg flex justify-start items-start pt-8 px-4 lg:px-28 `}
      >
        <div className={`flex justify-start items-center gap-1 text-gray-800 `}>
          <Link href={"/"}>جاجیگا</Link>
          <FaAngleLeft className="w-3 h-3" />
          <span className="text-lg font-bold">حساب کاربری</span>
        </div>
      </div>
      <div
        className={`w-full bg-white  z-1 -mt-4 rounded-tr-2xl rounded-tl-2xl
           px-4 lg:px-28 `}
      >
        <ProfileImage user={user} />
        <ProfileDetails user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
