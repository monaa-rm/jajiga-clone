import {
  setRegions,
  regionActive,
  setAllRegions,
  setActiveNumbers,
  setShowRegion,
} from "@/store/slices/filterSlice";
import { useEffect } from "react";
import { BsCheck, BsTrash3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const regionTitle = [
  {
    name: "beach",
    title: "ساحلی",
  },
  {
    name: "jungle",
    title: "جنگلی",
  },
  {
    name: "cuntrySide",
    title: "ییلاقی",
  },
  {
    name: "city",
    title: "شهری",
  },
  {
    name: "cityround",
    title: "حومه شهر",
  },
  {
    name: "rural",
    title: "روستایی",
  },
];
const RegionBox = ({
  otherfilter,
  deleteAllOtherFilters,
  setDeleteAllOtherFilters,
  selectedRegions,
}) => {
  const dispatch = useDispatch();

  const regions = useSelector((store) => store.filterSlice.regionFilter.region);

  useEffect(() => {
    if (deleteAllOtherFilters && otherfilter) {
      dispatch(setAllRegions());
      dispatch(regionActive(false));
      setDeleteAllOtherFilters(false);
      dispatch(setActiveNumbers("sm"));
    }
  }, [otherfilter, deleteAllOtherFilters]);
  return (
    <div className={`${otherfilter ? "block xl:hidden" : "block"} w-full pt-5`}>
      <div className="flex justify-start items-end gap-4">
        <div className="w-2 h-10 rounded-tl-2xl rounded-bl-2xl bg-yellow-500"></div>
        <h3 className="text-lg text-gray-700 font-bold">منطقه اقامتگاه</h3>
      </div>
      <div className="flex flex-col gap-3  p-4">
        <div className="grid grid-cols-2 gap-4 text-gray-600 font-[vazirRegular] ">
          {regionTitle.map((item, i) => (
            <div
              onClick={() => {
                dispatch(setRegions(item.name));
                selectedRegions?.length == 1 && regions[item.name] == true
                  ? dispatch(regionActive(false))
                  : dispatch(regionActive(true));
                if (otherfilter) dispatch(setActiveNumbers("sm"));
              }}
              key={i}
              className={`p-3 flex justify-between items-center shadow-md shadow-gray-200 border
              ${
                regions[item.name] == true
                  ? "border-yellow-600 bg-yellow-50"
                  : " border-gray-100"
              }
             rounded-lg  `}
            >
              <div className="flex justify-start items-center gap-1 ">
                <span>{item.title}</span>
              </div>
              {regions[item.name] == true ? (
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
          } flex justify-between items-center pt-3`}
        >
          <button
            className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 border-dashed hover:border-gray-400 rounded-md"
            onClick={() => {
              dispatch(setAllRegions());
              dispatch(regionActive(false));
            }}
          >
            <BsTrash3 className="w-5 h-5" />
            <span className="text-sm md:text-base"> پاک کردن </span>
          </button>
          <div className="flex justify-end gap-3 items-center">
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => {
                dispatch(setAllRegions());
                dispatch(setShowRegion(false));
                dispatch(regionActive(false));
              }}
            >
              <IoCloseOutline className="w-5 h-5" />
              <span className="text-sm md:text-base">بیخیال</span>
            </button>
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 border-2 rounded-md"
              onClick={() => {
                dispatch(setShowRegion(false));
                if (selectedRegions?.length) dispatch(regionActive(true));
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

export default RegionBox;
