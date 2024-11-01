import { addResBed, reduceResBed } from "@/store/slices/newRoomSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const Newroombedcounter = ({ title, bed_type, roomnum }) => {
  const roomNumber = useSelector((store) => store.newRoomSlice.room);
  const bedDetails = useSelector((store) => store.newRoomSlice.bed);
  const dispatch = useDispatch();
  const plusButtonHandler = () => {
    dispatch(addResBed({ roomnum, bed_type: bed_type }));
  };
  const minusButtonHanler = () => {
    dispatch(reduceResBed({ roomnum, bed_type: bed_type }));
  };

  return (
    <div className="w-full flex justify-start items-center gap-4">
      <h3 className="text-gray-800 text-sm w-52">{title}</h3>
      <div className="w-[250px] flex justify-between items-center gap-3">
        <button
          onClick={() => plusButtonHandler()}
          className={`w-8 h-8 text-gray-500 cursor-pointer border-2 border-gray-100 hover:border-gray-200
       rounded-lg transition-all duration-300 flex justify-center items-center `}
        >
          <FaPlus className="w-4 h-4" />
        </button>
        <div className="text-gray-700  font-bold">
         { bedDetails[roomnum] ?  bedDetails[roomnum][bed_type] : null}
        </div>
        <button
          disabled={ bedDetails[roomnum] && bedDetails[roomnum][bed_type] == 0}
          onClick={() => minusButtonHanler()}
          className={`w-8 h-8 border-2 
   ${
    bedDetails[roomnum] && bedDetails[roomnum][bed_type] == 0
       ? "text-gray-300 cursor-not-allowed border-gray-50"
       : "text-gray-500  cursor-pointer border-gray-100 hover:border-gray-200"
   }    rounded-lg transition-all duration-300 flex justify-center items-center `}
        >
          <FaMinus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Newroombedcounter;
