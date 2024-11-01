import BedRoomBox from "@/components/elements/filter-boxs/bed-room-box";
import { setShowBedroom } from "@/store/slices/filterSlice";
import { useEffect, useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const BedRoomFilterSection = () => {
  const bedroomActive = useSelector(
    (store) => store.filterSlice.bedroomFilter.active
  );
  const room_num = useSelector((store) => store.filterSlice.bedroomFilter.room);
  const bed_num = useSelector((store) => store.filterSlice.bedroomFilter.bed);
  const showBedroom = useSelector((store) => store.filterSlice.showBedroom);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#bedroomFilter")) {
        dispatch(setShowBedroom(false));
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showBedroom]);
  useEffect(() => {
    if (showBedroom) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showBedroom]);
  return (
    <>
      <div
        onClick={() => dispatch(setShowBedroom(true))}
        className={`hidden lg:flex gap-1 justify-center items-center px-3 sm:px-3 md:px-2 lg:px-1 xl:px-3  py-2 rounded-full 
              border font-[vazirRegular] transition-all
              ${
                bedroomActive
                  ? "border-yellow-600 bg-yellow-50 hover:bg-yellow-100 "
                  : "border-gray-200 bg-gray-50 hover:bg-gray-200 sm:min-w-min hover:bg-opacity-50"
              }
               duration-300 cursor-pointer text-gray-700 text-xs `}
      >
        <IoBedOutline className="w-4 h-4" />

        {bedroomActive && (bed_num != 0 || room_num != 0 )? (
          <div className=" text-center text-xs flex gap-1 items-center">
            {bed_num != 0 ? `${bed_num} تخت` : null}
            {room_num != 0 && bed_num != 0 && "،"}{" "}
            {room_num != 0 ? `${room_num} اتاق` : null}
          </div>
        ) : (
          <span>تعداد اتاق و تخت</span>
        )}
      </div>

      <div
        id="bedroomFilter"
        className={`absolute hidden lg:block ${
          showBedroom
            ? "   lg:block top-96   md:top-12 pb-40 md:pb-0 bg-white"
            : " lg:hidden"
        } transition-all duration-500 right-0 left-0 md:right-[26rem] md:left-auto w-full 
            md:w-[400px] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl`}
      >
        <BedRoomBox />
      </div>
    </>
  );
};

export default BedRoomFilterSection;
