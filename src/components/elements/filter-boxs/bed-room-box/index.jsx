import {
  bedroomActive,
  guestNumActive,
  setActiveNumbers,
  setBed,
  setGuestNum,
  setRoom,
  setShowBedroom,
} from "@/store/slices/filterSlice";
import { useEffect } from "react";
import { BsTrash3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const BedRoomBox = ({
  otherfilter,
  deleteAllOtherFilters,
  setDeleteAllOtherFilters,
}) => {
  const dispatch = useDispatch();

  const room_num = useSelector((store) => store.filterSlice.bedroomFilter.room);
  const bed_num = useSelector((store) => store.filterSlice.bedroomFilter.bed);
  useEffect(() => {
    if (deleteAllOtherFilters && otherfilter) {
      dispatch(setBed(0));
      dispatch(setRoom(0));
      dispatch(bedroomActive(false));
      setDeleteAllOtherFilters(false);
    }
  }, [otherfilter, deleteAllOtherFilters]);
  return (
    <div className={`${otherfilter ? "block lg:hidden" : "block"} w-full pt-5`}>
      <div className="flex justify-start items-end gap-4">
        <div className="w-2 h-10 rounded-tl-2xl rounded-bl-2xl bg-yellow-500"></div>
        <h3 className="text-lg text-gray-700 font-bold">تعداد تخت و اتاق</h3>
      </div>
      <div className="flex flex-col gap-3  p-4">
        <div className="flex justify-between items-center gap-4">
          <div>تعداد اتاق خواب</div>
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={() => {
                dispatch(setRoom(room_num + 1));
                dispatch(bedroomActive(true));
                if (otherfilter) dispatch(setActiveNumbers("sm"));
              }}
              className={` border-2 border-gray-100 p-2 rounded-md text-gray-500 active:bg-gray-200`}
            >
              <FaPlus className="w-5 h-5" />
            </button>
            <div className="w-14 text-lg flex gap-1 justify-center items-center">
              {room_num}
            </div>
            <button
              onClick={() => {
                room_num > 0 && dispatch(setRoom(room_num - 1));
                dispatch(bedroomActive(true));
                if (otherfilter) dispatch(setActiveNumbers("sm"));
              }}
              disabled={room_num < 1}
              className={` disabled:border-gray-50 disabled:text-gray-200   disabled:cursor-not-allowed
             border-2 border-gray-100 p-2 rounded-md text-gray-500 ${
               room_num > 0 && "active:bg-gray-200"
             }  `}
            >
              <FaMinus className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div>تعداد تخت خواب</div>
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={() => {
                dispatch(setBed(bed_num + 1));
                if (otherfilter) dispatch(setActiveNumbers("sm"));
              }}
              className={` border-2 border-gray-100 p-2 rounded-md text-gray-500 active:bg-gray-200`}
            >
              <FaPlus className="w-5 h-5" />
            </button>
            <div className="w-14 text-lg flex gap-1 justify-center items-center">
              {bed_num}
            </div>
            <button
              onClick={() => {
                bed_num > 0 && dispatch(setBed(bed_num - 1));
                if (otherfilter) dispatch(setActiveNumbers("sm"));
              }}
              disabled={bed_num < 1}
              className={` disabled:border-gray-50 disabled:text-gray-200   disabled:cursor-not-allowed
             border-2 border-gray-100 p-2 rounded-md text-gray-500 ${
               bed_num > 0 && "active:bg-gray-200"
             }  `}
            >
              <FaMinus className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div
          className={` justify-between items-center pt-3 ${
            otherfilter ? "hidden" : "flex"
          }`}
        >
          <button
            className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 border-dashed hover:border-gray-400 rounded-md"
            onClick={() => {
              dispatch(setBed(0));
              dispatch(setRoom(0));
              dispatch(bedroomActive(false));
            }}
          >
            <BsTrash3 className="w-5 h-5" />
            <span className="text-sm md:text-base"> پاک کردن </span>
          </button>
          <div className="flex justify-end gap-3 items-center">
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => {
                dispatch(setBed(0));
                dispatch(setRoom(0));
                dispatch(setShowBedroom(false));
                dispatch(bedroomActive(false));
              }}
            >
              <IoCloseOutline className="w-5 h-5" />
              <span className="text-sm md:text-base">بیخیال</span>
            </button>
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 border-2 rounded-md"
              onClick={() => {
                room_num != 0 || bed_num != 0
                  ? dispatch(bedroomActive(true))
                  : dispatch(bedroomActive(false));

                dispatch(setShowBedroom(false));
              }}
            >
              <CiSearch className="w-5 h-5" />
              <span className="text-sm md:text-base">اعمال</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedRoomBox;
