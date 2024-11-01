"use client";

import { MdClose, MdOutlineDone } from "react-icons/md";
import { provinceList } from "../../../utils/provinces";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import {
  setSelectedAlLCities,
  setSelectedCities,
  setShowSearchBox,
  setShowSearchCityList,
  setShowSearchProvinceList,
} from "@/store/slices/headerListSlice";
import { citiesList } from "../../../utils/cities";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { setSendBounds } from "@/store/slices/filterSlice";

const SearchCityListBox = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [selectedProvinceCities, setSelectedProvinceCities] = useState([]);
  const showBox = useSelector((store) => store.headerListSlice.showSearchBox);

  const showSearchProvinceList = useSelector(
    (store) => store.headerListSlice.showSearchProvinceList
  );
  const showSearchCityList = useSelector(
    (store) => store.headerListSlice.showSearchCityList
  );
  const selectedCities = useSelector(
    (store) => store.headerListSlice.selectedCities
  );
  useEffect(() => {
    if (showSearchCityList) {
      setSelectedProvinceCities(
        citiesList.filter((item) => item.province_id == showSearchCityList.id)
      );
    } else {
      setSelectedProvinceCities(false);
    }
  }, [showSearchCityList]);

  return (
    <div
      className={` flex justify-center ${
        pathname == "/" ? "relative  " : "absolute left-0 right-0 bottom-0 "
      }    ${
        showSearchProvinceList
          ? " overflow-y-scroll provinceListHeight sm:pt-16  z-[1001] sm:h-screen  top-[100px] sm:top-0"
          : "overflow-y-hidden h-0 topsearchliststyle "
      }  transition-all duration-500`}
    >
      <MdClose
        className={`w-6 h-6 text-white cursor-pointer absolute top-12 left-5 sm:left-[60px] ${
          showSearchProvinceList ? "block" : "hidden"
        }  `}
      />
      <div
        id="provinceserchlistId"
        className={` flex flex-col rounded-2xl ${
          showSearchProvinceList
            ? "top-[70px] bg-white  pb-[100px]"
            : "top-[100vh] h-0 bg-none "
        } transition-all rounded-2xl duration-500 w-full sm:w-[600px] md:w-[700px]`}
      >
        <p
          className={`font-bold text-lg text-gray-800 ${
            showSearchProvinceList && !showSearchCityList
              ? "block p-4 "
              : "hidden"
          }`}
        >
          استان مورد نظر خود را انتخاب کنید
        </p>
        <p
          className={`font-bold text-center text-lg text-gray-800 ${
            showSearchProvinceList && showSearchCityList
              ? "block p-4 "
              : "hidden"
          }`}
        >
          شهر های استان {showSearchCityList?.name}
        </p>
        <div
          className={`${
            showSearchProvinceList
              ? "flex flex-col text-center bg-white justify-center items-start pb-5"
              : "hidden"
          }`}
        >
          {!showSearchCityList &&
            provinceList.map((item, i) => (
              <div className="px-4 w-full" key={i}>
                <div
                  className={`w-full ${
                    provinceList.length - 1 != i && "border-b"
                  }  border-gray-200 pb-2`}
                  onClick={() => {
                    dispatch(
                      setShowSearchCityList({ id: item.id, name: item.name })
                    );
                    setSelectedProvinceCities(
                      citiesList.filter(
                        (item) => item.province_id == showSearchCityList.id
                      )
                    );
                  }}
                >
                  <div className=" w-full hover:pr-4 py-3 transition-all duration-300 flex justify-between items-center cursor-pointer">
                    <span className="pr-0 text-gray-700 ">{item.name}</span>
                    <FaAngleLeft className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          className={`${
            showSearchProvinceList
              ? "flex flex-col text-center bg-white justify-center items-start"
              : "hidden"
          } ${showSearchProvinceList && showSearchCityList && "pb-5"}`}
        >
          {showSearchProvinceList && showSearchCityList ? (
            <div
              onClick={() => {
                if (selectedCities?.length == selectedProvinceCities?.length) {
                  dispatch(setSendBounds(false));
                  dispatch(setSelectedAlLCities([]));
                } else {
                  dispatch(setSendBounds(false));
                  dispatch(setSelectedAlLCities(selectedProvinceCities));
                }
              }}
              className="flex w-full p-4 justify-end items-center gap-4 text-gray-700 text-sm"
            >
              <span>انتخاب همه</span>
              {selectedCities.length == selectedProvinceCities.length ? (
                <div
                  className="w-5 h-5 rounded-md border border-gray-200 flex justify-center items-center cursor-pointer
                    transition-all duration-300 bg-black"
                >
                  <MdOutlineDone className="w-4 h-4 text-white " />
                </div>
              ) : (
                <div
                  className="w-5 h-5 rounded-md border border-gray-400 hover:border-gray-500 cursor-pointer
                     transition-all duration-300 bg-white"
                ></div>
              )}
            </div>
          ) : null}

          {selectedProvinceCities?.length &&
            selectedProvinceCities?.map((item, i) => (
              <div
                className="px-4 w-full transition-all duration-300 border-gray-200"
                key={i}
              >
                <div
                  className={`w-full  ${
                    selectedProvinceCities?.length - 1 != i && "border-b"
                  } border-gray-200 pb-2`}
                >
                  <div
                    onClick={() => {
                      dispatch(setSelectedCities(item));
                      dispatch(setSendBounds(false));
                    }}
                    className=" w-full hover:pr-4 py-3 transition-all duration-300 flex justify-between items-center cursor-pointer"
                  >
                    <span className="pr-0 text-sm text-gray-700 ">
                      {item.name}
                    </span>
                    {selectedCities?.includes(item) ? (
                      <div
                        className="w-5 h-5 rounded-md border border-gray-200 flex justify-center items-center cursor-pointer
                    transition-all duration-300 bg-black"
                      >
                        <MdOutlineDone className="w-4 h-4 text-white " />
                      </div>
                    ) : (
                      <div
                        className="w-5 h-5 rounded-md border border-gray-400 hover:border-gray-500 cursor-pointer
                     transition-all duration-300 bg-white"
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {showSearchProvinceList ? (
          <div
            className="w-full sm:w-[600px] md:w-[700px] flex justify-center items-center py-8 gap-3 sm:gap-5
           bg-white border-t h-[100px] border-gray-200 shadow-sm sticky bottom-0 "
          >
            <button
              onClick={() => {
                if (showSearchCityList) {
                  dispatch(setShowSearchCityList(false));
                  dispatch(setShowSearchProvinceList(true));
                } else {
                  dispatch(setShowSearchCityList(false));
                  dispatch(setShowSearchProvinceList(false));
                  dispatch(setShowSearchBox(true));
                }
              }}
              className="w-40 h-10 flex justify-center items-center rounded-md bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300"
            >
              بازگشت
            </button>
            <Link
              onClick={() => {
                dispatch(setShowSearchBox(false));
                dispatch(setShowSearchProvinceList(false));
                dispatch(setSendBounds(false));
              }}
              href={`/s`}
              className="w-40 h-10 flex justify-center items-center gap-2 rounded-md bg-yellow-500
             hover:bg-yellow-600 text-gray-600 transition-all duration-300"
            >
              <BiSearch className="w-4 h-4" />
              <span>جستجو</span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchCityListBox;
