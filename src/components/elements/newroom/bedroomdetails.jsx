"use client";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Newroombedcounter from "./newroombedcounter";
import { useSelector } from "react-redux";

const Bedroomdetails = ({ boxnum }) => {
  const [showmore, setShowmore] = useState(false);
  const roomNumber = useSelector((store) => store.newRoomSlice.room);
  const bedDetails = useSelector((store) => store.newRoomSlice.bed);

  return (
    <div className="rounded-md shadow-md p-4 flex flex-col gap-2  ">
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col justify-center items-start">
          <span className="text-gray-800 ">
            {boxnum == 0 ? "فضای مشترک" : `اتاق ${boxnum}`}
          </span>
          <span className="text-xs text-gray-600 w-[175px]  sm:w-[300px] line-clamp-1">
            {bedDetails[boxnum] &&
            bedDetails[boxnum]["mattress"] == 0 &&
            bedDetails[boxnum]["singlebed"] == 0 &&
            bedDetails[boxnum]["dubblebed"] == 0
              ? "تخت خواب ندارد"
              : `${
                  bedDetails[boxnum] &&
                  bedDetails[boxnum]["singlebed"] != 0 ?
                  bedDetails[boxnum]["singlebed"] + "تخت تک نفره." : ""
                }${
                  bedDetails[boxnum] &&
                  bedDetails[boxnum]["dubblebed"] != 0 ? 
                  bedDetails[boxnum]["dubblebed"] + "تخت دو نفره." : ""
                }${
                  bedDetails[boxnum] &&
                  bedDetails[boxnum]["mattress"] != 0 ? 
                  bedDetails[boxnum]["mattress"] + "رخت خواب سنتی.": ""
                } `}
          </span>
        </div>
        {showmore ? (
          <button
            onClick={() => setShowmore(false)}
            className="px-3 py-2 text-sm sm:text-base rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          >
            بستن
          </button>
        ) : (
          <button
            onClick={() => setShowmore(true)}
            className="px-3 text-sm sm:text-base py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
          >
            افزودن تخت
          </button>
        )}
      </div>
      {showmore ? (
        <div className="flex flex-col gap-3 pt-6">
          <Newroombedcounter
            bed_type="mattress"
            title={"رخت خواب سنتی"}
            roomnum={boxnum}
          />
          <Newroombedcounter
            bed_type="singlebed"
            title={"تخت یک نفره"}
            roomnum={boxnum}
          />
          <Newroombedcounter
            bed_type="dubblebed"
            title={"تخت دو نفره"}
            roomnum={boxnum}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Bedroomdetails;
