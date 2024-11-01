import GuestNumberBox from "@/components/elements/filter-boxs/guest-number-box";
import { setEnabled, setShowGuestNum } from "@/store/slices/filterSlice";
import { useEffect, useState } from "react";
import { PiUsersThreeLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const GuestNumberFilterSection = () => {
  const guestnumActive = useSelector(
    (store) => store.filterSlice.guestFilter.active
  );
  const enabled = useSelector((store) => store.filterSlice.enabled);

  const guestnum = useSelector((store) => store.filterSlice.guestFilter.number);
  const showGuestNum = useSelector((store) => store.filterSlice.showGuestNum);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#guestNumFilter")) {
        dispatch(setShowGuestNum(false));
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showGuestNum]);
  useEffect(() => {
    if (showGuestNum) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showGuestNum]);
  return (
    <>
      <div
        onClick={() => {
          !enabled && window.innerWidth < 766 && dispatch(setEnabled(true));
          dispatch(setShowGuestNum(true));
        }}
        className={`flex  w-full md:w-auto gap-1  justify-center items-center ${
          guestnum > 1
            ? "px-1 min-w-28"
            : "px-1 sm:px-3 md:px-2 lg:px-1 xl:px-2"
        } py-2 rounded-full 
              border  font-[vazirRegular] transition-all
              ${
                guestnumActive
                  ? "border-yellow-600 bg-yellow-50 hover:bg-yellow-100 "
                  : "border-gray-200 bg-gray-50 hover:bg-gray-200 sm:min-w-min hover:bg-opacity-50"
              }
               duration-300 cursor-pointer text-gray-700 text-xs  `}
      >
        <PiUsersThreeLight className="w-4 h-4" />
        {guestnumActive ? (
          <div className="w-10 text-center flex gap-1 items-center">
            {guestnum} نفر
          </div>
        ) : (
          <span>تعداد نفرات</span>
        )}
      </div>
      <div
        id="guestNumFilter"
        className={`absolute ${
          showGuestNum
            ? "md:block top-[20rem] guestBottom  md:h-auto md:top-12 pb-56 md:pb-0 bg-white"
            : " top-[80rem] md:hidden"
        } transition-all duration-500 right-0 left-0 md:right-32 md:left-auto w-full 
            md:w-[400px] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl`}
      >
        <GuestNumberBox />
      </div>
    </>
  );
};

export default GuestNumberFilterSection;
