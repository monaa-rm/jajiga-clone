"use client";
import Bedroomdetails from "@/components/elements/newroom/bedroomdetails";
import { setResBedActive, setResRoom } from "@/store/slices/newRoomSlice";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const NewroomBedroom = () => {
  const dispatch = useDispatch();
  const roomNumber = useSelector((store) => store.newRoomSlice.room);
  const bedDetails = useSelector((store) => store.newRoomSlice.bed);
  const [boxNumber, setBoxNumber] = useState([0]);
  useEffect(() => {
    function createBox(n) {
      let array = [];
      for (let i = 0; i <= n; i++) {
        array.push(i);
      }
      return array;
    }

    setBoxNumber(createBox(roomNumber));
    dispatch(setResBedActive());
  }, [roomNumber]);
  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="flex justify-start items-center gap-4 ">
        <h3 className="w-52 text-gray-800">تعداد اتاق خواب</h3>
        <div className="w-[250px] flex justify-between items-center gap-3">
          <button
            onClick={() =>
              dispatch(setResRoom({ num: +roomNumber + 1, type: "add" }))
            }
            className={`w-8 h-8 text-gray-500 cursor-pointer border-2 border-gray-100 hover:border-gray-200
               rounded-lg transition-all duration-300 flex justify-center items-center `}
          >
            <FaPlus className="w-4 h-4" />
          </button>
          <div className="text-gray-500 text-xs font-bold">
            {+roomNumber == 0 ? "فاقد اتاق خواب" : `${roomNumber} اتاق`}
          </div>
          <button
            disabled={roomNumber == 0}
            onClick={() =>
              dispatch(setResRoom({ num: +roomNumber - 1, type: "reduce" }))
            }
            className={`w-8 h-8 border-2 
           ${
             +roomNumber == 0
               ? "text-gray-300 cursor-not-allowed border-gray-50"
               : "text-gray-500  cursor-pointer border-gray-100 hover:border-gray-200"
           }    rounded-lg transition-all duration-300 flex justify-center items-center `}
          >
            <FaMinus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {boxNumber.map((item) => (
        <Bedroomdetails key={item} boxnum={item} />
      ))}
    </div>
  );
};

export default NewroomBedroom;
