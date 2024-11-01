import {
  guestNumActive,
  setGuestNum,
  setShowGuestNum,
} from "@/store/slices/filterSlice";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const GuestNumberBox = () => {
  const dispatch = useDispatch();
  let guestnum = useSelector((store) => store.filterSlice.guestFilter.number);
  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between items-center gap-4">
        <div>تعداد نفرات</div>
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={() => {
              dispatch(setGuestNum(guestnum + 1));
            }}
            className={` border-2 border-gray-100 p-2 rounded-md text-gray-500 active:bg-gray-200`}
          >
            <FaPlus className="w-5 h-5" />
          </button>
          <div className="w-10 text-center flex gap-1 items-center">
            {" "}
            {guestnum} نفر
          </div>
          <button
            onClick={() => {
              guestnum > 1 && dispatch(setGuestNum(guestnum - 1));
            }}
            disabled={guestnum < 2}
            className={` disabled:border-gray-50 disabled:text-gray-200   disabled:cursor-not-allowed
             border-2 border-gray-100 p-2 rounded-md text-gray-500 ${
               guestnum > 1 && "active:bg-gray-200"
             }  `}
          >
            <FaMinus className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-start py-8">
        <AiOutlineExclamationCircle className="w-4 h-4 text-gray-500" />
        <span className="font-[vazirRegular] text-gray-500 text-sm">
          با انتخاب تعداد نفرات، نتایج دقیق تری را مشاهده کنید.
        </span>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 border-dashed hover:border-gray-400 rounded-md"
          onClick={() => {
            dispatch(setGuestNum(1));
            dispatch(guestNumActive(false));
          }}
        >
          <BsTrash3 className="w-5 h-5" />
          <span className="text-sm md:text-base"> پاک کردن </span>
        </button>
        <div className="flex justify-end gap-3 items-center">
          <button
            className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={() => {
              dispatch(setShowGuestNum(false));
              dispatch(setGuestNum(1));
              dispatch(guestNumActive(false));
            }}
          >
            <IoCloseOutline className="w-5 h-5" />
            <span className="text-sm md:text-base">بیخیال</span>
          </button>
          <button
            className="flex items-center gap-1 px-3 py-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 border-2 rounded-md"
            onClick={() => {
              dispatch(guestNumActive(true)), dispatch(setShowGuestNum(false));
            }}
          >
            <CiSearch className="w-5 h-5" />
            <span className="text-sm md:text-base">اعمال</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestNumberBox;
