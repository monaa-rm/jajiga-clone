import { setOptions, optionsActive, setActiveNumbers } from "@/store/slices/filterSlice";
import { AiOutlinePhone } from "react-icons/ai";
import { BiCabinet } from "react-icons/bi";
import { BsCheck, BsTrash3 } from "react-icons/bs";
import {
  GiGasStove,
  GiPoolTriangle,
  GiVacuumCleaner,
  GiWashingMachine,
} from "react-icons/gi";
import { IoIosWifi } from "react-icons/io";
import { IoSnowOutline } from "react-icons/io5";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { LuGlassWater, LuParkingCircle, LuTv } from "react-icons/lu";
import {
  MdDryCleaning,
  MdOutlineElectricalServices,
  MdOutlineKebabDining,
  MdOutlineTableBar,
} from "react-icons/md";
import { PiShower, PiThermometerHot, PiToilet } from "react-icons/pi";
import { Ri24HoursFill, RiSofaLine } from "react-icons/ri";
import {
  TbElevator,
  TbFridge,
  TbIroning2,
  TbMicrowave,
  TbToolsKitchen3,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { residanceOptions } from "../../../../../utils/constants";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
const icons = {
  pool: <LiaSwimmingPoolSolid className="w-4 h-4" />,
  billiard: <GiPoolTriangle className="transform -rotate-[15deg] w-4 h-4" />,
  toilet: <PiToilet className="w-4 h-4" />,
  shower: <PiShower className="w-4 h-4" />,
  parking: <LuParkingCircle className="w-4 h-4" />,
  coolingSystem: <IoSnowOutline className="w-4 h-4" />,
  heatingSystem: <PiThermometerHot className="w-4 h-4" />,
  vacuumCleaner: <GiVacuumCleaner className="w-4 h-4" />,
  gasStove: <GiGasStove className="w-4 h-4" />,
  kitchen: <TbToolsKitchen3 className="w-4 h-4" />,
  kebab: <MdOutlineKebabDining className="w-4 h-4" />,
  sofa: <RiSofaLine className="w-4 h-4" />,
  tv: <LuTv className="w-4 h-4" />,
  lunchtable: <MdOutlineTableBar className="w-4 h-4" />,
  cleanstuff: <MdDryCleaning className="w-4 h-4" />,
  closetDrawer: <BiCabinet className="w-4 h-4" />,
  electricity: <MdOutlineElectricalServices className="w-4 h-4" />,
  onDay: <Ri24HoursFill className="w-4 h-4" />,
  elevator: <TbElevator className="w-4 h-4" />,
  washingMachine: <GiWashingMachine className="w-4 h-4" />,
  microwave: <TbMicrowave className="w-4 h-4" />,
  wifi: <IoIosWifi className="w-4 h-4" />,
  phone: <AiOutlinePhone className="w-4 h-4" />,
  fridge: <TbFridge className="w-4 h-4" />,
  iron: <TbIroning2 className="w-4 h-4" />,
  water: <LuGlassWater className="w-4 h-4" />,
};

const OptionItemsBox = () => {
  const dispatch = useDispatch();
  const [showExtraOptions, setShowExtraOptions] = useState(false);
  const optionItems = useSelector(
    (store) => store.filterSlice.optionsFilter.options
  );
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#OtherFilter")) {
        setShowExtraOptions(false);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showExtraOptions]);
  return (
    <div className="w-full pt-5">
      <div className="flex justify-start items-end gap-4">
        <div className="w-2 h-10 rounded-tl-2xl rounded-bl-2xl bg-yellow-500"></div>
        <h3 className="text-lg text-gray-700 font-bold">امکانات اقامتگاه</h3>
      </div>
      <div className="flex flex-col gap-3  p-4">
        <div className="grid grid-cols-2 items-center gap-4 text-gray-600 font-[vazirRegular] ">
          {residanceOptions.map((item, i) => (
              <div
                onClick={() => {
                  dispatch(setOptions(item.name));
                  dispatch(optionsActive(true));
                  dispatch(setActiveNumbers("sm"))
                }}
                key={i}
                className={` ${
                  i < 5 ? "flex" : showExtraOptions ? "flex" : "hidden"
                } p-3  justify-between items-center shadow-md shadow-gray-200 border
              ${
                optionItems[item.name] == true
                  ? "border-yellow-600 bg-yellow-50"
                  : " border-gray-100"
              }
             rounded-lg  `}
              >
                <div className="flex justify-start items-center gap-1 ">
                  <span>{icons[item.name]}</span>
                  <span>{item.title}</span>
                </div>
                {optionItems[item.name] == true ? (
                  <div className="w-6 h-6 rounded-md border border-black bg-black">
                    <BsCheck className="text-white w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-md border hover:border-gray-300 border-gray-200 bg-white"></div>
                )}
              </div>

          ))}
          <div
            onClick={() => setShowExtraOptions(true)}
            className={`${
              showExtraOptions == false ? "flex" : "hidden"
            } justify-start items-center gap-1 text-blue-500 cursor-pointer`}
          >
            <FaPlus className="w-4 h-4" />
            <span>مشاهده بیشتر</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionItemsBox;
