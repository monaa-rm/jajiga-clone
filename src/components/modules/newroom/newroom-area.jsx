"use client"
import { setRegion, setResExclusive, setResType } from "@/store/slices/newRoomSlice";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const residanceType = [
  { name: "villa", title: "ویلا" },
  { name: "apartment", title: "آپارتمان" },
  { name: "suite", title: "سوئیت" },
  { name: "cottage", title: "کلبه" },
  { name: "ruralhome", title: "خانه روستایی" },
];

const residanceRegion = [
  { name: "beach", title: "ساحلی" },
  { name: "cuntrySide", title: "ییلاقی" },
  { name: "city", title: "شهری" },
  { name: "cityround", title: "حومه شهر" },
  { name: "rural", title: "روستایی" },
  { name: "jungle", title: "جنگلی" },
];
const NewroomArea = () => {
  const dispatch = useDispatch();
  const [showExclusive, setShowExclusive] = useState(false);
  const [showtype, setShowType] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const exclusive = useSelector((store) => store.newRoomSlice.exclusive);
  const region = useSelector((store) => store.newRoomSlice.region);
  const resType = useSelector((store) => store.newRoomSlice.type);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#exclusiveId")) {
        setShowExclusive(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showExclusive]);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#regionId")) {
        setShowRegion(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showtype]);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#typeId")) {
        setShowType(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showRegion]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-44  ">فضای اقامتگاه </span>

        <div className={` md:relative w-full md:w-80 `}>
          <div
            onClick={() => {
              setShowExclusive(true);
              setShowType(false);
              setShowRegion(false);
            }}
            className=" py-2 px-3 w-full  overflow-hidden flex justify-between items-center border
           border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer rounded-lg"
          >
            <div className="flex justify-start items-center gap-3">
              {exclusive   ? (
                <span>دربست</span>
              ) : exclusive == false ? (
                <span>نیمه دربست</span>
              ) : (
                <span className="text-gray-400 ">
                  فضای اقامتگاه خود را انتخاب کنید
                </span>
              )}
            </div>
            <FaAngleDown className="w-3 h-3" />
          </div>
          <div
            className={`cityz transition-all duration-700 ${
              showExclusive
                ? " fixed md:static w-full min-h-96 md:min-h-0 md:h-0 md:w-0 top-0 right-0 bottom-0 left-0 bg-black md:bg-none bg-opacity-60"
                : "top-full "
            }`}
          ></div>
          <div
            id="exclusiveId"
            className={`bg-white shadowstyle rounded-lg fixed md:absolute  left-0 bottom-0 md:top-0  md:h-80 w-full 
          overflow-hidden border-gray-300 ${
            showExclusive ? " top-[25rem] md:block  z-[902]" : "md:hidden top-full  "
          }  transition-all duration-300`}
          >
            <div className=" border pt-2 px-2 overflow-y-scroll h-full  ">
              <div
                onClick={() => {
                  dispatch(setResExclusive(true));
                  setShowExclusive(false);
                }}
                className={`px-3 py-3 ${
                  exclusive == 1 ? "bg-gray-50" : "bg-none"
                } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
              >
                دربست
              </div>
              <div
                onClick={() => {
                  dispatch(setResExclusive(false));
                  setShowExclusive(false);
                }}
                className={`px-3 py-3 ${
                  exclusive == 2 ? "bg-gray-50" : "bg-none"
                } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
              >
                نیمه دربست
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-44  ">نوع اقامتگاه</span>

        <div className={` md:relative w-full md:w-80 `}>
          <div
            onClick={() => {
                setShowType(true);
                setShowExclusive(false);
                setShowRegion(false);
            }}
            className={` py-2 px-3 w-full  overflow-hidden flex justify-between items-center border
           border-gray-300  transition-all duration-200  rounded-lg hover:border-gray-400 cursor-pointer`}
          >
            <div className="flex justify-start items-center gap-3">
              {resType.name ? (
                <span>{resType.title}</span>
              ) : (
                <span className="text-gray-400 ">نوع اقامتگاه خود را انتخاب کنید</span>
              )}
            </div>
            <FaAngleDown className="w-3 h-3" />
          </div>
          <div
            className={`cityz transition-all duration-700 ${
              showtype
                ? " fixed md:static w-full min-h-96 md:min-h-0 md:h-0 md:w-0 top-0 right-0 bottom-0 left-0 bg-black md:bg-none bg-opacity-60"
                : "top-full"
            }`}
          ></div>
          <div
            id="typeId"
            className={`bg-white z-[902] shadowstyle rounded-lg fixed md:absolute  left-0 bottom-0 md:top-0  md:h-80 w-full md:w-[90%] 
          overflow-hidden border-gray-300 ${
            showtype ? " top-60 md:block" : "md:hidden top-full  "
          }  transition-all duration-300`}
          >
            <div className=" border pt-2 px-2 overflow-y-scroll h-full  ">
              {residanceType.length &&
                residanceType?.map((item, i) => (
                  <div
                    onClick={() => {
                      dispatch(setResType(item))

                      setShowType(false);
                    }}
                    key={i}
                    className={`px-3 py-3 ${
                      resType.name == item?.name ? "bg-gray-50" : "bg-none"
                    } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
                  >
                    {item?.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-44  ">منطقه اقامتگاه</span>

        <div className={` md:relative w-full md:w-80 `}>
          <div
            onClick={() => {
                setShowType(false);
                setShowExclusive(false);
                setShowRegion(true);
            }}
            className={` py-2 px-3 w-full  overflow-hidden flex justify-between items-center border
           border-gray-300  transition-all duration-200  rounded-lg hover:border-gray-400 cursor-pointer`}
          >
            <div className="flex justify-start items-center gap-3">
              {region.name ? (
                <span>{region.title}</span>
              ) : (
                <span className="text-gray-400 ">نوع اقامتگاه خود را انتخاب کنید</span>
              )}
            </div>
            <FaAngleDown className="w-3 h-3" />
          </div>
          <div
            className={`cityz transition-all duration-700 ${
              showRegion
                ? " fixed md:static w-full min-h-96 md:min-h-0 md:h-0 md:w-0 top-0 right-0 bottom-0 left-0 bg-black md:bg-none bg-opacity-60"
                : "top-full"
            }`}
          ></div>
          <div
            id="regionId"
            className={`bg-white z-[902] shadowstyle rounded-lg fixed md:absolute  left-0 bottom-0 md:top-0  md:h-80 w-full md:w-[90%] 
          overflow-hidden border-gray-300 ${
            showRegion ? " top-60 md:block" : "md:hidden top-full  "
          }  transition-all duration-300`}
          >
            <div className=" border pt-2 px-2 overflow-y-scroll h-full  ">
              {residanceRegion.length &&
                residanceRegion?.map((item, i) => (
                  <div
                    onClick={() => {
                      dispatch(setRegion(item))

                      setShowRegion(false);
                    }}
                    key={i}
                    className={`px-3 py-3 ${
                      region.name == item?.name ? "bg-gray-50" : "bg-none"
                    } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
                  >
                    {item?.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewroomArea;
