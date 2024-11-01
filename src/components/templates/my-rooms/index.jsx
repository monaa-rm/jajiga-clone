"use client";

import AcceptedResidances from "@/components/modules/myroomsItems/acceptedResidances";
import AllResidances from "@/components/modules/myroomsItems/allresidances";
import PendingResidances from "@/components/modules/myroomsItems/pendingResidances";
import RejectedResidances from "@/components/modules/myroomsItems/rejectedResidances";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-scroll";

const MyroomsPage = () => {
  const [activeItem, setActiveItem] = useState("all");
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/residance/getResidances?activeItem=${activeItem}`
      );
      const data = await res.json();
      setData(data?.data);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(" error fetch");
    } finally {
      setIsSearching(false);
    }
  }, [activeItem]);
  return (
    <div className="w-full min-w-full relative">
      <div
        className={`w-full  h-36 z-0 
         newroom_bg flex justify-start items-start pt-8 px-4 lg:px-28 relative  `}
      >
        <div
          className={`flex justify-start items-center gap-0.5 cursor-pointer text-gray-800 `}
        >
          <Link href={"/"}>جاجیگا</Link>
          <FaAngleLeft className="w-3 h-3" />
          <span className="text-lg font-bold"> لیست اقامتگاه ها</span>
        </div>
        <div className={`absolute bottom-3`}>
          <div
            className={`flex justify-start items-center gap-4 md:gap-6 font-[vazirRegular] text-sm myrooms overflow-x-scroll sm:overflow-auto`}
          >
            <div
              className="flex flex-col gap-0.5 cursor-pointer"
              onClick={() => {
                if (activeItem !== "all") {
                  setData([]);
                  setIsSearching(true);
                  setActiveItem("all");
                }
              }}
            >
              <span
                className={`text-gray-700  mb-1  ${
                  activeItem == "all" && "font-bold"
                }`}
              >
                همه اقامتگاه ها 
              </span>
              <div
                className={`h-1 w-full rounded-tr-full rounded-tl-full  bg-gray-700 transition-all duration-300  ${
                  activeItem == "all" ? "bg-opacity-100" : " bg-opacity-0"
                }`}
              ></div>
            </div>
            <div
              className="flex flex-col gap-0.5 cursor-pointer"
              onClick={() => {
                if (activeItem !== "pending") {
                  setData([]);
                  setIsSearching(true);
                  setActiveItem("pending");
                }
              }}
            >
              <span
                className={`text-gray-700  mb-1 ${
                  activeItem == "pending" && "font-bold"
                }`}
              >
                در انتظار بررسی 
              </span>
              <div
                className={`h-1 w-full rounded-tr-full rounded-tl-full transition-all duration-300 bg-gray-700  ${
                  activeItem == "pending" ? "bg-opacity-100" : " bg-opacity-0"
                }`}
              ></div>
            </div>
            <div
              className="flex flex-col gap-0.5 cursor-pointer"
              onClick={() => {
                if (activeItem !== " accepted") {
                  setData([]);
                  setIsSearching(true);
                  setActiveItem("accepted");
                }
              }}
            >
              <span
                className={`text-gray-700  mb-1 ${
                  activeItem == "accepted" && "font-bold"
                }`}
              >
                تایید شده 
              </span>
              <div
                className={`h-1 w-full rounded-tr-full rounded-tl-full transition-all duration-300 bg-gray-700  ${
                  activeItem == "accepted" ? "bg-opacity-100" : " bg-opacity-0"
                }`}
              ></div>
            </div>
            <div
              className="flex flex-col gap-0.5 cursor-pointer"
              onClick={() => {
                if (activeItem !== "rejected") {
                  setData([]);
                  setIsSearching(true);
                  setActiveItem("rejected");
                }
              }}
            >
              <span
                className={`text-gray-700  mb-1 ${
                  activeItem == "rejected" && "font-bold"
                }`}
              >
                تایید نشده 
              </span>
              <div
                className={`h-1 w-full rounded-tr-full rounded-tl-full transition-all duration-300 bg-gray-700 ${
                  activeItem == "rejected" ? "bg-opacity-100" : " bg-opacity-0"
                } `}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-96 -mt-3 bg-white rounded-tr-2xl rounded-tl-2xl absolute z-[10]">
        {activeItem == "all" ? (
          <AllResidances data={data} isSearching={isSearching} />
        ) : activeItem == "pending" ? (
          <PendingResidances
            data={data}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            setActiveItem={setActiveItem}
          />
        ) : activeItem == "rejected" ? (
          <RejectedResidances
            data={data}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            setActiveItem={setActiveItem}
          />
        ) : activeItem == "accepted" ? (
          <AcceptedResidances data={data} isSearching={isSearching} />
        ) : (
          <AllResidances />
        )}
      </div>
    </div>
  );
};

export default MyroomsPage;
