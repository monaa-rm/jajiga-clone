import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { PiUserCircleThin } from "react-icons/pi";
import SelectProfileImage from "./select-profile-image";
import { MdOutlineEdit } from "react-icons/md";
import { useSession } from "next-auth/react";

const ProfileImage = ({ user }) => {
  const [showImageBox, setShowImageBox] = useState(false);
  const { data, status } = useSession();
  return (
    <div>
      <div className=" w-full relative">
        {status == "authenticated" ?? user?.image ? (
          <div className="absolute h-24 w-24 -top-10  left-1/2 -translate-x-1/2 rounded-full bg-white border border-gray-200">
            <div className="w-full h-full relative rounded-full">
              <Image
                src={data?.user?.image ?? user?.image }
                alt={user?.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div
              className="absolute bottom-2 -right-1 w-7 h-7 rounded-full bg-yellow-500 hover:bg-yellow-600
               transition-all duration-300  flex justify-center items-center  cursor-pointer
              "
              onClick={() => setShowImageBox(true)}
            >
              <MdOutlineEdit className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        ) : (
          <div className="absolute h-24 w-24 -top-10 left-1/2 -translate-x-1/2 rounded-full bg-white">
            <PiUserCircleThin className="w-full h-full rounded-full text-gray-300" />
            <div
              className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-yellow-500 hover:bg-yellow-600
               transition-all duration-300  flex justify-center items-center  cursor-pointer
              "
              onClick={() => setShowImageBox(true)}
            >
              <FaPlus className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        )}
      </div>
      <div
        className={`fixed transition-all z-[700] duration-300 ${
          showImageBox ? "top-0" : "top-full"
        } right-0 left-0 bottom-0 bg-black bg-opacity-60`}
      ></div>
      <SelectProfileImage
        showImageBox={showImageBox}
        setShowImageBox={setShowImageBox}
      />
    </div>
  );
};

export default ProfileImage;
