"use client";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Searchbox from "./searchbox";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSearchBox,
  setShowSearchProvinceList,
} from "@/store/slices/headerListSlice";
import { usePathname } from "next/navigation";
import SearchCityListBox from "./searchCityListBox";
import Image from "next/image";

const JajigaSearch = ({ pathname }) => {
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = useState(-1);
  const showBox = useSelector((store) => store.headerListSlice.showSearchBox);
  const showSearchProvinceList = useSelector(
    (store) => store.headerListSlice.showSearchProvinceList
  );
  const showSearchCityList = useSelector(
    (store) => store.headerListSlice.showSearchCityList
  );
  const isSearching = useSelector((store) => store.filterSlice.isSearching);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#serchboxId")) {
        dispatch(setShowSearchBox(false));
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showBox]);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#provinceserchlistId")) {
        dispatch(setShowSearchProvinceList(false));
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showSearchProvinceList]);
  useEffect(() => {
    if (showBox || showSearchProvinceList) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showBox, showSearchProvinceList]);
  return (
    <div
      className={`${
        pathname == "/"
          ? "flex flex-col justify-center items-center gap-4 py-12"
          : "w-full"
      }`}
    >
      {pathname == "/" ? (
        <h2 className="text-white text-2xl ">
          اجاره ویلا در شمال و سراسر ایران زیبا
        </h2>
      ) : null}
      <div
        className={`relative   ${
          pathname == "/"
            ? " w-64 sm:w-96 "
            : "border border-gray-300 rounded-full w-full"
        }`}
      >
        {isSearching ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-16 h-6">
            <Image
              src={"/images/search-spinner.gif"}
              alt="loading"
              fill
              className="object-cover"
            />
          </div>
        ) : null}
        <input
          type="text"
          placeholder={isSearching ? "" : "میخوای کجا بری؟"}
          className="rounded-full py-2 px-3 w-full placeholder:text-gray-300 font-[vazirregular]  outline-none"
          onFocus={() => {
            setShowBtn(1);
          }}
          onClick={() => {
            if (!isSearching) {
              dispatch(setShowSearchBox(true));
            }
          }}
          onBlur={() => setShowBtn(-1)}
        />
        <BiSearch
          className={`absolute m-auto inset-y-0 left-1  text-gray-700 ${
            pathname == "/"
              ? "bg-yellow-400 hover:bg-yellow-500  "
              : showBtn == 1
              ? "bg-yellow-400"
              : "bg-transparent"
          } transition-all duration-300 ease-in-out cursor-pointer rounded-full p-[5px] text-3xl`}
        />

        {showBox && !isSearching ? (
          <div className={`hidden md:flex w-full  `}>
            <Searchbox />
          </div>
        ) : null}
      </div>
      <div
        className={` ${showBox && !showSearchProvinceList && "md:hidden"} ${
          !showSearchProvinceList && pathname != "/" && "bottom-full"
        } z-[1000] fixed top-0 left-0 right-0 ${
          (showBox || showSearchProvinceList || showSearchCityList) &&
          pathname != "/"
            ? "bottom-0"
            : "bottom-full"
        } transition-all duration-500   bg-black bg-opacity-60 `}
      ></div>
    </div>
  );
};

export default JajigaSearch;
