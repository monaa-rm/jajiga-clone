"use client";
import { setEnabled, setSendBounds } from "@/store/slices/filterSlice";
import {
  removeSelectedCities,
  setSelectedCities,
  setShowSearchBox,
  setShowSearchProvinceList,
} from "@/store/slices/headerListSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const popularcities = [
  {
    id: 966,
    name: "رامسر",
    slug: "رامسر",
    province_id: 27,
  },
  {
    id: 943,
    name: "ماسال",
    slug: "ماسال",
    province_id: 26,
  },
  {
    id: 1161,
    name: "سوادکوه",
    slug: "سوادکوه",
    province_id: 27,
  },
  {
    id: 1135,
    name: "کردان",
    slug: "کردان",
    province_id: 5,
  },
];
const Searchbox = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const enabled = useSelector((store) => store.filterSlice.enabled);

  const [showBtn, setShowBtn] = useState(-1);
  const selectedCities = useSelector(
    (store) => store.headerListSlice.selectedCities
  );
  const showBox = useSelector((store) => store.headerListSlice.showSearchBox);
  const showProvinces = useSelector(
    (store) => store.headerListSlice.showSearchProvinceList
  );
  const showCities = useSelector(
    (store) => store.headerListSlice.showSearchCityList
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const deleteSelectedCity = (id) => {
    dispatch(removeSelectedCities(id));
  };
  const mapHandler = () => {
    pathname.startsWith("/s") ? dispatch(setEnabled(true)) : router.push("/s");
    dispatch(setEnabled(true));
  };
  return (
    <div
      id="serchboxId"
      className={` fixed md:absolute  border border-gray-300 shadow-sm shadow-gray-200 top-0 
        md:top-11 left-0 right-0 md:left-auto md:right-auto z-[2001] p-4 w-full  flex flex-col
         gap-8 bg-white rounded-br-2xl rounded-bl-2xl md:rounded-2xl `}
    >
      <div
        className={`relative md:hidden   
          border border-gray-300 rounded-full w-full
        `}
      >
        <input
          type="text"
          placeholder="میخوای کجا بری؟"
          className="rounded-full py-2 px-3 w-full placeholder:text-gray-300 font-[vazirregular]  outline-none"
          onFocus={() => {
            setShowBtn(1);
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
      </div>
      <div className="flex justify-center flex-wrap items-center gap-3">
        <h3 dir="rtl">مقاصد پرطرفدار:</h3>
        <div className="flex justify-center flex-wrap items-center gap-3">
          {popularcities.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                dispatch(setSelectedCities(item));
                dispatch(setSendBounds(false));
                dispatch(setShowSearchBox(false));
                router.push("/s");
              }}
              className=" cursor-pointer px-2 py-1 rounded-full bg-yellow-500 hover:bg-yellow-600  transition-all duration-300 text-xs text-gray-700"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 text-gray-700 text-sm">
        <span
          onClick={() => {
            dispatch(setEnabled(true));

            dispatch(setShowSearchBox(false));
            dispatch(setShowSearchProvinceList(true));
          }}
          className="cursor-pointer"
        >
          لیست شهر ها
        </span>
        <span>|</span>
        <div className="cursor-pointer" onClick={mapHandler}>
          جستجو در نقشه
        </div>
      </div>
      {pathname.startsWith("/s") && selectedCities.length ? (
        <div
          className={` w-full flex flex-col pb-3 max-h-96 ${
            selectedCities.length > 8 && " overflow-y-scroll"
          } `}
        >
          {selectedCities.map((item, index) => (
            <div
              onClick={() => deleteSelectedCity(item.id)}
              key={item.id}
              className={`hover:bg-gray-50 cursor-pointer transition-all duration-300 px-1 py-3 flex justify-between items-center ${
                index != selectedCities.length - 1 ? "border-b" : "border-none"
              } `}
            >
              <h3 className="text-gray-500 font-[vazirRegular] flex justify-start gap-1 text-sm ">
                <IoLocationOutline className="w-5 h-5" />{" "}
                <span>{item.name}</span>{" "}
              </h3>
              <span className="">
                <MdOutlineRemoveCircle className="text-gray-600 w-5 h-5 " />
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Searchbox;
