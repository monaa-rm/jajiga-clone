"use client"
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { provinceList } from "../../../../utils/provinces";
import { FaAngleDown } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { citiesList } from "../../../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "@/store/slices/newRoomSlice";

const NewroomAddress = () => {
  const [showprovinceList, setShowProvinceList] = useState(false);
  const [showCityList, setShowCityList] = useState(false);
  const [provinceCities, setProvinceCities] = useState([]);
  const province = useSelector(store => store.newRoomSlice.address.province)
  const city = useSelector(store => store.newRoomSlice.address.city)
  const exactAddress = useSelector(store => store.newRoomSlice.address.exactAddress)
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#provinceId")) {
        setShowProvinceList(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showprovinceList]);
  useEffect(() => {
   
    const handleClick = (event) => {
      if (!event.target.closest("#cityId")) {
        setShowCityList(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showCityList]);

  return (
    <div className="px-4 flex flex-col gap-4 ">
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-44  ">انتخاب استان</span>

        <div className={` md:relative w-full md:w-80 `}>
          <div
            onClick={() => {
              setShowProvinceList(true);
              setShowCityList(false);
            }}
            className=" py-2 px-3 w-full  overflow-hidden flex justify-between items-center border
           border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer rounded-lg"
          >
            <div className="flex justify-start items-center gap-3">
              <CiLocationOn className="w-5 h-5" />
              {province.name ? (
                <span>{province.name}</span>
              ) : (
                <span className="text-gray-400 ">استان خود را انتخاب کنید</span>
              )}
            </div>
            <FaAngleDown className="w-3 h-3" />
          </div>
          <div
            className={`cityz transition-all duration-700 ${
              showprovinceList
                ? " fixed md:static w-full min-h-96 md:min-h-0 md:h-0 md:w-0 top-0 right-0 bottom-0 left-0 bg-black md:bg-none bg-opacity-60"
                : "top-full "
            }`}
          ></div>
          <div
            id="provinceId"
            className={`bg-white z-[902] shadowstyle rounded-lg fixed md:absolute  left-0 bottom-0 md:top-0  md:h-80 w-full md:w-[90%] 
          overflow-hidden border-gray-300 ${
            showprovinceList ? " top-20 md:block" : "md:hidden top-full  "
          }  transition-all duration-300`}
          >
            <div className=" border pt-2 px-2 overflow-y-scroll h-full  ">
              {provinceList.map((item, i) => (
                <div
                  onClick={() => {
                    dispatch(setAddress({province : item , city : ""}))
                    setShowProvinceList(false);
                    setProvinceCities(
                      citiesList.filter((city) => city.province_id == item.id)
                    );
                  }}
                  key={i}
                  className={`px-3 py-3 ${
                    province.id == item.id ? "bg-gray-50" : "bg-none"
                  } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-44  ">انتخاب شهر</span>

        <div className={` md:relative w-full md:w-80 `}>
          <div
            onClick={() => {
              if (province.name) {
                setShowCityList(true);
                setShowProvinceList(false);
              }
            }}
            className={` py-2 px-3 w-full  overflow-hidden flex justify-between items-center border
           border-gray-300  transition-all duration-200  rounded-lg ${
             !province.name
               ? "bg-gray-200 cursor-not-allowed"
               : "hover:border-gray-400 cursor-pointer"
           }`}
          >
            <div className="flex justify-start items-center gap-3">
              <CiLocationOn className="w-5 h-5" />
              {city.name ? (
                <span>{city.name}</span>
              ) : (
                <span className="text-gray-400 ">شهر خود را انتخاب کنید</span>
              )}
            </div>
            <FaAngleDown className="w-3 h-3" />
          </div>
          <div
            className={`cityz transition-all duration-700 ${
              showCityList
                ? " fixed md:static w-full min-h-96 md:min-h-0 md:h-0 md:w-0 top-0 right-0 bottom-0 left-0 bg-black md:bg-none bg-opacity-60"
                : "top-full"
            }`}
          ></div>
          <div
            id="cityId"
            className={`bg-white z-[902] shadowstyle rounded-lg fixed md:absolute  left-0 bottom-0 md:top-0  md:h-80 w-full md:w-[90%] 
          overflow-hidden border-gray-300 ${
            showCityList ? " top-20 md:block" : "md:hidden top-full  "
          }  transition-all duration-300`}
          >
            <div className=" border pt-2 px-2 overflow-y-scroll h-full  ">
              {provinceCities.length &&
                provinceCities?.map((item, i) => (
                  <div
                    onClick={() => {
                      dispatch(setAddress({ city : item}))

                      setShowCityList(false);
                    }}
                    key={i}
                    className={`px-3 py-3 ${
                      city.id == item?.id ? "bg-gray-50" : "bg-none"
                    } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
                  >
                    {item?.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start  gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-44  ">آدرس دقیق</span>
        <div className="w-full md:w-auto flex flex-col justify-start items-start gap-2">
          <textarea
          value={exactAddress}
          onChange={(e) => dispatch(setAddress({exactAddress : e.target.value }))
        }
            className=" p-2 w-full max-w-full md:w-80 max-h-80 min-h-11 rounded-lg border outline-none border-gray-300 focus:border-gray-400 hover:border-gray-400"
            rows={5}
          />
          <span className=" text-gray-500 w-full max-w-full md:max-w-80 text-justify text-xs" dir="rtl">
            آدرس اقامتگاه را با جزییات کامل وارد کنید تا میهمان پس از رزرو به
            راحتی بتوانند اقامتگاه را پیدا کنند.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewroomAddress;
