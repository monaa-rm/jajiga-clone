"use client";
import OtherFilterBox from "@/components/elements/filter-boxs/other-filter-box";
import {
  deleteExclusive,
  deleteOptions,
  deleteRules,
  setActiveNumbers,
  setEnabled,
  setExclusive,
  setShowOtherFilters,
} from "@/store/slices/filterSlice";
import { useEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { RiFilter3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const OtherFilterSection = () => {
  const [deleteAllOtherFilters, setDeleteAllOtherFilters] = useState(false);
  const activesItems = useSelector((store) => store.filterSlice.activeItems);
  const ShowOtherFilters = useSelector(
    (store) => store.filterSlice.ShowOtherFilters
  );
  const enabled = useSelector((store) => store.filterSlice.enabled);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#OtherFilter")) {
        dispatch(setShowOtherFilters(false));
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [ShowOtherFilters]);
  useEffect(() => {
    if (ShowOtherFilters) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [ShowOtherFilters]);

  const deleteFiltersHandler = () => {
    setDeleteAllOtherFilters(true);
    dispatch(deleteExclusive());
    dispatch(deleteOptions());
    dispatch(deleteRules());
    dispatch(setActiveNumbers("sm"));
  };

  return (
    <>
      <div
        onClick={() => {
          !enabled && window.innerWidth < 766 && dispatch(setEnabled(true));
          dispatch(setShowOtherFilters(true));
        }}
        className={`flex relative w-full md:w-auto gap-2 justify-center items-center
           px-1 sm:px-3 md:px-2 lg:px-1 xl:px-2  py-2 rounded-full 
              border font-[vazirRegular] transition-all
    ${
      activesItems
        ? "border-yellow-600 bg-yellow-50 hover:bg-yellow-100 "
        : "border-gray-200 bg-gray-50 hover:bg-gray-200  hover:bg-opacity-50"
    }
               duration-300 cursor-pointer text-gray-700 text-xs  `}
      >
        <RiFilter3Line className="w-4 h-4" />
        <span>سایر فیلتر ها</span>
        {activesItems > 0 && (
          <div className="absolute flex items-center justify-center top-[-0.57rem]  md:top-[-0.55rem] left-0 md:-left-2 w-6 h-6 rounded-full bg-yellow-500 text-white">
            {activesItems}
          </div>
        )}
      </div>

      <div
        id="OtherFilter"
        className={`fixed overflow-hidden shadow-sm  ${
          ShowOtherFilters
            ? "md:block top-32 bottom-0  md:top-[113px] md:pb-0 bg-white"
            : " top-[60rem] md:hidden"
        } transition-all duration-500  right-0 left-0 md:right-auto md:left-20 lg:left-48 xl:left-96 w-full 
          md:w-[700px] otherfiltersHeight md:h-[34.5rem] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl `}
      >
        <OtherFilterBox
          deleteAllOtherFilters={deleteAllOtherFilters}
          setDeleteAllOtherFilters={setDeleteAllOtherFilters}
        />
        <div
          className={` justify-between items-center py-2 border-t border-gray-200 px-3 w-full
       bg-white fixed md:absolute transition-all duration-500 ${ShowOtherFilters ? "flex top-auto bottom-0 " : "top-full md:top-auto  md:hidden "}`}
        >
          <button
            className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 border-dashed hover:border-gray-400 rounded-md"
            onClick={() => deleteFiltersHandler()}
          >
            <BsTrash3 className="w-5 h-5" />
            <span className="text-sm md:text-base"> پاک کردن </span>
          </button>
          <div className="flex justify-end gap-3 items-center">
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => {
                dispatch(setShowOtherFilters(false));
                deleteFiltersHandler();
              }}
            >
              <IoCloseOutline className="w-5 h-5" />
              <span className="text-sm md:text-base">بیخیال</span>
            </button>
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 border-2 rounded-md"
              onClick={() => dispatch(setShowOtherFilters(false))}
            >
              <CiSearch className="w-5 h-5" />
              <span className="text-sm md:text-base">اعمال</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherFilterSection;
