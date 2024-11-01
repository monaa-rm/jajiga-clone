"use client";

import { setCheckTime } from "@/store/slices/newRoomSlice";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const arraivalTimeList = [
  "12 ظهر",
  "1 ظهر",
  "2 ظهر",
  "3 ظهر",
  "4 عصر",
  "5 عصر",
  "6 عصر",
  "7 شب",
  "8 شب",
  "9 شب",
  "10 شب",
  "11 شب",
  "12 شب",
  "1 شب",
  "2 شب",
  "3 صبح",
  "4 صبح",
  "5 صبح",
  "6 صبح",
  "7 صبح",
  "8 صبح",
  "9 صبح",
  "10 صبح",
  "11 صبح",
];
const depurtureTimeList = [
  "11 صبح",
  "12 ظهر",
  "1 ظهر",
  "2 ظهر",
  "3 ظهر",
  "4 عصر",
  "5 عصر",
  "6 عصر",
  "7 شب",
  "8 شب",
  "9 شب",
  "10 شب",
  "11 شب",
  "12 شب",
  "1 شب",
  "2 شب",
  "3 صبح",
  "4 صبح",
  "5 صبح",
  "6 صبح",
  "7 صبح",
  "8 صبح",
  "9 صبح",
  "10 صبح",
];
const NewroomCheckTime = () => {
  const checktime = useSelector((store) => store.newRoomSlice.checkTime);
  const [showArrival, setShowArrival] = useState(false);
  const [showDepurture, setShowDepurture] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
   
    const handleClick = (event) => {
      if (!event.target.closest("#arrivalId")) {
        setShowArrival(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showArrival]);
  useEffect(() => {
   
    const handleClick = (event) => {
      if (!event.target.closest("#depurtureId")) {
        setShowDepurture(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showDepurture]);

  return (
    <div className=" w-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-44  ">زمان تحویل</span>

        <div className={` md:relative w-full md:w-80 `}>
          <div
            onClick={() => {
              setShowArrival(true);
              setShowDepurture(false);
            }}
            className={` py-2 px-3 w-full  overflow-hidden flex justify-between items-center border
           border-gray-300  transition-all duration-200  rounded-lg hover:border-gray-400 cursor-pointer`}
          >
            <div className="flex justify-start items-center gap-3">
              <span>{checktime.arrivaltime}</span>
            </div>
            <FaAngleDown className="w-3 h-3" />
          </div>
          <div
            className={`cityz transition-all duration-700 ${
              showArrival
                ? " fixed md:static w-full min-h-96 md:min-h-0 md:h-0 md:w-0 top-0 right-0 bottom-0 left-0 bg-black md:bg-none bg-opacity-60"
                : "top-full"
            }`}
          ></div>
          <div
            id="arrivalId"
            className={`bg-white z-[902] shadowstyle rounded-lg fixed md:absolute  left-0 bottom-0 md:top-0  md:h-80 w-full md:w-[90%] 
          overflow-hidden border-gray-300 ${
            showArrival ? " top-20 md:block" : "md:hidden top-full  "
          }  transition-all duration-300`}
          >
            <div className=" border pt-2 px-2 overflow-y-scroll h-full  ">
              {arraivalTimeList.length &&
                arraivalTimeList?.map((item, i) => (
                  <div
                    onClick={() => {
                      dispatch(
                        setCheckTime({ check: "arrivaltime", time: item })
                      );
                      setShowArrival(false);
                    }}
                    key={i}
                    className={`px-3 py-3 ${
                      checktime.arrivaltime == item ? "bg-gray-50" : "bg-none"
                    } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-44  ">زمان تخلیه</span>

        <div className={` md:relative w-full md:w-80 `}>
          <div
            onClick={() => {
              setShowArrival(false);
              setShowDepurture(true);
            }}
            className={` py-2 px-3 w-full  overflow-hidden flex justify-between items-center border
           border-gray-300  transition-all duration-200  rounded-lg hover:border-gray-400 cursor-pointer`}
          >
            <div className="flex justify-start items-center gap-3">
              <span>{checktime.depurturetime}</span>
            </div>
            <FaAngleDown className="w-3 h-3" />
          </div>
          <div
            className={`cityz transition-all duration-700 ${
              showDepurture
                ? " fixed md:static w-full min-h-96 md:min-h-0 md:h-0 md:w-0 top-0 right-0 bottom-0 left-0 bg-black md:bg-none bg-opacity-60"
                : "top-full"
            }`}
          ></div>
          <div
            id="depurtureId"
            className={`bg-white z-[902] shadowstyle rounded-lg fixed md:absolute  left-0 bottom-0 md:top-0  md:h-80 w-full md:w-[90%] 
          overflow-hidden border-gray-300 ${
            showDepurture ? " top-20 md:block" : "md:hidden top-full  "
          }  transition-all duration-300`}
          >
            <div className=" border pt-2 px-2 overflow-y-scroll h-full  ">
              {depurtureTimeList.length &&
                depurtureTimeList?.map((item, i) => (
                  <div
                    onClick={() => {
                      dispatch(
                        setCheckTime({ check: "depurturetime", time: item })
                      );
                      setShowDepurture(false);
                    }}
                    key={i}
                    className={`px-3 py-3 ${
                      checktime.depurturetime == item ? "bg-gray-50" : "bg-none"
                    } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewroomCheckTime;
