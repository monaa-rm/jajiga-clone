import {
  exclusiveActive,
  setActiveNumbers,
  setExclusive,
} from "@/store/slices/filterSlice";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const ExclusiveBox = () => {
  const dispatch = useDispatch();
  const exclusiveValue = useSelector(
    (store) => store.filterSlice.rentTypeFilter.type
  );

  return (
    <div className="w-full pt-5">
      <div className="flex justify-start items-end gap-4">
        <div className="w-2 h-10 rounded-tl-2xl rounded-bl-2xl bg-yellow-500"></div>
        <h3 className="text-lg text-gray-700 font-bold">نوع اجاره</h3>
      </div>
      <div className="flex flex-col gap-3  p-4">
        <div className="grid grid-cols-2 gap-4 text-gray-600 font-[vazirRegular] ">
          <div
            onClick={() => {
              dispatch(setExclusive("exclusive"));
              dispatch(exclusiveActive(true));
              dispatch(setActiveNumbers("sm"));
            }}
            className={`p-3 flex justify-between items-center shadow-md shadow-gray-200 border
              ${
                exclusiveValue.exclusive == true
                  ? "border-yellow-600 bg-yellow-50"
                  : " border-gray-100"
              }
             rounded-lg  `}
          >
            <div className="flex justify-start items-center gap-1 ">
              <span>دربست</span>
            </div>
            {exclusiveValue.exclusive == true ? (
              <div className="w-6 h-6 rounded-md border border-black bg-black">
                <BsCheck className="text-white w-6 h-6" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-md border hover:border-gray-300 border-gray-200 bg-white"></div>
            )}
          </div>
          <div
            onClick={() => {
              dispatch(setExclusive("notexclusive"));
              dispatch(exclusiveActive(true));
              dispatch(setActiveNumbers("sm"));
            }}
            className={`p-3 flex justify-between items-center shadow-md shadow-gray-200 border
              ${
                exclusiveValue.notexclusive == true
                  ? "border-yellow-600 bg-yellow-50"
                  : " border-gray-100"
              }
             rounded-lg  `}
          >
            <div className="flex justify-start items-center gap-1 ">
              <span>نیمه دربست</span>
            </div>
            {exclusiveValue.notexclusive == true ? (
              <div className="w-6 h-6 rounded-md border border-black bg-black">
                <BsCheck className="text-white w-6 h-6" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-md border hover:border-gray-300 border-gray-200 bg-white"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveBox;
