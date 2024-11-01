"use client";
import { residanceOptions } from "../../../utils/constants";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import {
  GiGasStove,
  GiPoolTriangle,
  GiVacuumCleaner,
  GiWashingMachine,
} from "react-icons/gi";
import { PiShower, PiThermometerHot, PiToilet } from "react-icons/pi";
import { IoSnowOutline } from "react-icons/io5";
import {
  TbElevator,
  TbFridge,
  TbMicrowave,
  TbToolsKitchen3,
} from "react-icons/tb";
import {
  MdDryCleaning,
  MdOutlineElectricalServices,
  MdOutlineKebabDining,
  MdOutlineTableBar,
} from "react-icons/md";
import { Ri24HoursFill, RiSofaLine } from "react-icons/ri";
import { LuGlassWater, LuParkingCircle, LuTv } from "react-icons/lu";
import { BiCabinet } from "react-icons/bi";
import { IoIosWifi } from "react-icons/io";
import { AiOutlinePhone } from "react-icons/ai";

import { TbIroning2 } from "react-icons/tb";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCircleExclamation } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
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

const ResidanceOptions = ({dataOptions}) => {
  const [divHeight, setDivHeight] = useState(false);
  const residanceOptionstrue = dataOptions.filter((item) => item.hasIt);
  const heighttrue = residanceOptionstrue.length;
  const heightall = dataOptions.length;

  return (
    <div
      className={` relative py-1 transtodiv`}
      style={{
        height: divHeight
          ? `${Math.ceil(heightall) * 15 + 20}px`
          : `${Math.ceil(heighttrue / 2) * 27 + 34}px`,
      }}
    >
      <div
        onClick={() => setDivHeight(!divHeight)}
        className="w-20 py-1 z-[2] absolute -bottom-1 left-1/2 transform -translate-x-1/2  transition-all duration-500 bg-white hover:bg-gray-200 rounded-full shadow-sm shadow-gray-300 text-sm flex gap-1 text-gray-700 cursor-pointer items-center justify-center "
      >
        {divHeight ? (
          <span className="flex gap-2 items-center">
            بستن <FaChevronUp />
          </span>
        ) : (
          <span className="flex gap-2 items-center">
            بیشتر <FaChevronDown />
          </span>
        )}
      </div>
      <div className={`grid grid-cols-2 gap-2 `}>
        {dataOptions.map((item, i) => {
          {
            if (item.hasIt) {
              return (
                <div
                  key={i}
                  className="font-[vazirregular]  text-sm flex items-center justify-start gap-2 text-gray-700"
                >
                  <span>{icons[item.name]}</span>
                  <span>{residanceOptions[i].title}</span>
                  {item.description ? (
                    <span
                      className="rounded-full  cursor-pointer bg-blue-400"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={item.description}
                      data-tooltip-place="top"
                      data-tooltip-delay-show={300}
                    >
                      <FaCircleExclamation className="w-[14px] h-[14px] text-blue-100 " />
                    </span>
                  ) : null}
                </div>
              );
            }
          }
        })}
        {dataOptions.map((item, i) => {
          {
            if (item.hasIt == false) {
              return (
                <div
                  key={i}
                  className="font-[vazirregular]  w-fit text-sm flex items-center justify-start gap-2 relative text-gray-300"
                >
                  <hr className=" border-gray-300 w-full absolute" />
                  <span>{icons[item.name]}</span>
                  <span>{residanceOptions[i].title}</span>
                </div>
              );
            }
          }
        })}
      </div>
      <Tooltip
        id="my-tooltip"
        style={{ maxWidth: "50%", borderRadius: "10px" }}
      />
    </div>
  );
};

export default ResidanceOptions;
