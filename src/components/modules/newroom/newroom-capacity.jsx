"use client";
import {
  setCapacity,
  setMaxCapacity,
  setResArea,
  setResYard,
} from "@/store/slices/newRoomSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const NewroomCapacity = () => {
  const dispatch = useDispatch();
  const res_capacity = useSelector((store) => store.newRoomSlice.capacity);
  const res__max_capacity = useSelector(
    (store) => store.newRoomSlice.maxCapacity
  );
  const resArea = useSelector((store) => store.newRoomSlice.area);
  const resYard = useSelector((store) => store.newRoomSlice.yard);
  const capacityIncrease = () => {
    dispatch(setCapacity(res_capacity + 1));
    if (res__max_capacity < res_capacity + 1) {
      dispatch(setMaxCapacity(res__max_capacity + 1));
    }
  };
  const capacityDecrease = () => {
    if (res_capacity > 1) {
      dispatch(setCapacity(res_capacity - 1));
    }
  };
  const maxCapacityIncrease = () => {
    dispatch(setMaxCapacity(res__max_capacity + 1));
  };
  const maxCapacityDecrease = () => {
    if (res__max_capacity > res_capacity) {
      dispatch(setMaxCapacity(res__max_capacity - 1));
    }
  };

  return (
    <div className="w-full md:w-[500px] flex flex-col gap-8">
      <div className="flex justify-start items-center gap-4 ">
        <h3 className="w-52 text-gray-800">ظرفیت استاندارد</h3>
        <div className="w-[250px] flex justify-between items-center gap-3">
          <button
            onClick={() => capacityIncrease()}
            className={`w-8 h-8 text-gray-500 cursor-pointer border-2 border-gray-100 hover:border-gray-200
               rounded-lg transition-all duration-300 flex justify-center items-center `}
          >
            <FaPlus className="w-4 h-4" />
          </button>
          <div className="text-gray-700"> {res_capacity} نفر</div>
          <button
            disabled={res_capacity < 2}
            onClick={() => capacityDecrease()}
            className={`w-8 h-8 border-2 
           ${
             res_capacity < 2
               ? "text-gray-300 cursor-not-allowed border-gray-50"
               : "text-gray-500  cursor-pointer border-gray-100 hover:border-gray-200"
           }    rounded-lg transition-all duration-300 flex justify-center items-center `}
          >
            <FaMinus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex justify-start items-center gap-4 ">
        <h3 className="w-52 text-gray-800">حداکثر ظرفیت</h3>
        <div className="w-[250px] flex justify-between items-center gap-3">
          <button
            onClick={() => maxCapacityIncrease()}
            className={`w-8 h-8 text-gray-500 cursor-pointer border-2 border-gray-100 hover:border-gray-200
               rounded-lg transition-all duration-300 flex justify-center items-center `}
          >
            <FaPlus className="w-4 h-4" />
          </button>
          <div className="text-gray-700"> {res__max_capacity} نفر</div>
          <button
            disabled={res_capacity == res__max_capacity}
            onClick={() => maxCapacityDecrease()}
            className={`w-8 h-8 border-2 
           ${
             res_capacity == res__max_capacity
               ? "text-gray-300 cursor-not-allowed border-gray-50"
               : "text-gray-500  cursor-pointer border-gray-100 hover:border-gray-200"
           }    rounded-lg transition-all duration-300 flex justify-center items-center `}
          >
            <FaMinus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-start md:items-center gap-4 text-gray-700 ">
        <h3 className="w-52 text-sm ">متراژ زمین و محوطه اقامتگاه</h3>
        <div
          className="px-3 py-1 w-[270px] rounded-lg border-2 border-gray-200 flex  justify-between items-center transition-all duration-300
         hover:border-gray-300 focus:border-gray-300"
        >
          <input
            dir="ltr"
            value={resYard}
            onChange={(e) => dispatch(setResYard(e.target.value))}
            type="number"
            className="outline-none border-none"
          />
          <span className="text-gray-500">متر</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start  justify-start  gap-4 text-gray-700 ">
        <h3 className="w-52 md:pt-2 text-sm ">متراژ زیربنای اقامتگاه</h3>
        <div className="flex flex-col items-start gap-2">
          <div
            className={`px-3 py-1 w-[270px] rounded-lg border-2 flex  justify-between items-center transition-all duration-300
         hover:border-gray-300 focus:border-gray-300 ${+resYard < +resArea  ? "border-red-600 hover:border-red-600 focus:border-red-600" : "  border-gray-200"}`}
          >
            <input
              dir="ltr"
              value={resArea}
              onChange={(e) => dispatch(setResArea(e.target.value))}
              type="number"
              className="outline-none border-none"
            />
            <span className="text-gray-500">متر</span>
          </div>
          {+resYard < +resArea ? <span className="text-red-600 text-xs ">متراژ بنای اقامتگاه نمی‌تواند بزرگتر از متراژ زمین و محوطه باشد</span> : null}
        </div>
      </div>
    </div>
  );
};

export default NewroomCapacity;
