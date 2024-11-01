import {
  propertiesActive,
  setActiveNumbers,
  setAllProperties,
  setProperties,
  setShowProperty,
} from "@/store/slices/filterSlice";
import { useEffect } from "react";
import { BsCheck, BsTrash3 } from "react-icons/bs";
import { CiDiscount1, CiSearch } from "react-icons/ci";
import {  FaRegStar } from "react-icons/fa6";
import { GiGoldBar, GiMountainCave } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineElectricBolt, MdOutlinePets } from "react-icons/md";
import { TbBeach, TbDisabled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const propertyTitles = [
  {
    name: "luxury",
    title: "لوکس و مجلل",
    icon: <GiGoldBar className="w-5 h-5" />,
  },
  { name: "villa_sea", title: "لب آب", icon: <TbBeach className="w-5 h-5" /> },
  {
    name: "discount",
    title: "تخفیف دار",
    icon: <CiDiscount1 className="w-5 h-5" />,
  },
  {
    name: "scenic",
    title: "خوش منظره",
    icon: <GiMountainCave className="w-5 h-5" />,
  },
  {
    name: "disabled",
    title: "مناسب معلولین",
    icon: <TbDisabled className="w-5 h-5" />,
  },
  { name: "plus", title: "ممتاز", icon: <FaRegStar className="w-5 h-5" /> },
  {
    name: "instant",
    title: "رزرو فوری",
    icon: <MdOutlineElectricBolt className="w-5 h-5" />,
  },
  {
    name: "pet",
    title: "پت نواز",
    icon: <MdOutlinePets className="w-5 h-5" />,
  },
];
const PropertyBox = ({

  otherfilter,
  deleteAllOtherFilters,
  setDeleteAllOtherFilters,
  selectedProperties
}) => {
  const dispatch = useDispatch();

  const properties = useSelector(
    (store) => store.filterSlice.propertiesFilter.properties
  );
  useEffect(() => {
    if (deleteAllOtherFilters && otherfilter) {
      dispatch(setAllProperties());
      dispatch(propertiesActive(false));
      setDeleteAllOtherFilters(false)
    }
  }, [otherfilter, deleteAllOtherFilters]);

  return (
    <div className={`${otherfilter ? "block lg:hidden" : "block"} w-full pt-5`}>
      <div className="flex justify-start items-end gap-4">
        <div className="w-2 h-10 rounded-tl-2xl rounded-bl-2xl bg-yellow-500"></div>
        <h3 className="text-lg text-gray-700 font-bold">ویژگی های اقامتگاه</h3>
      </div>
      <div className="flex flex-col gap-3  p-4">
        <div className="grid grid-cols-2 gap-4 text-gray-600 font-[vazirRegular] ">
          {propertyTitles.map((item, i) => (
            <div
              onClick={() => {
                dispatch(setProperties(item.name));
                dispatch(propertiesActive(true));
                if (otherfilter) dispatch(setActiveNumbers("sm"))
              }}
              key={i}
              className={`p-3 flex justify-between items-center shadow-md shadow-gray-200 border
              ${
                properties[item.name] == true
                  ? "border-yellow-600 bg-yellow-50"
                  : " border-gray-100"
              }
             rounded-lg  `}
            >
              <div className="flex justify-start items-center gap-1 ">
                <span> {item.icon}</span>
                <span>{item.title}</span>
              </div>
              {properties[item.name] == true ? (
                <div className="w-6 h-6 rounded-md border border-black bg-black">
                  <BsCheck className="text-white w-6 h-6" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-md border hover:border-gray-300 border-gray-200 bg-white"></div>
              )}
            </div>
          ))}
        </div>
        <div
          className={`${
            otherfilter ? "hidden" : "flex"
          } justify-between items-center pt-3`}
        >
          <button
            className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 border-dashed hover:border-gray-400 rounded-md"
            onClick={() => {
              dispatch(setAllProperties());
              dispatch(propertiesActive(false));
            }}
          >
            <BsTrash3 className="w-5 h-5" />
            <span className="text-sm md:text-base"> پاک کردن </span>
          </button>
          <div className="flex justify-end gap-3 items-center">
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => {
               dispatch(setShowProperty(false));
                dispatch(setAllProperties());
                dispatch(propertiesActive(false));
              }}
            >
              <IoCloseOutline className="w-5 h-5" />
              <span className="text-sm md:text-base">بیخیال</span>
            </button>
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 border-2 rounded-md"
              onClick={() => {
                if(!selectedProperties.length){
                  dispatch(setAllProperties());
                  dispatch(propertiesActive(false));
                }
                dispatch(setShowProperty(false));
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

export default PropertyBox;
