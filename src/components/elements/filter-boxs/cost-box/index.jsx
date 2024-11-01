"use client";
import { useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { costActive, setActiveNumbers, setCost, setShowCost } from "@/store/slices/filterSlice";

const MIN = 0;
const MAX = 25000000;
const getStep = (value) => {
  return value < 10000000 ? 50 : 5000;
};

const CostBox = ({ otherfilter ,deleteAllOtherFilters , setDeleteAllOtherFilters}) => {
  const costValues = useSelector((store) => store.filterSlice.costFilter.cost);

  const dispatch = useDispatch();
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (values) => {
    dispatch(setCost(values));
    dispatch(costActive(true));
    if (otherfilter) dispatch(setActiveNumbers("sm"))
  };

  const inputFromHandler = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value)) {
      if (Number(value) < 0 || Number(value) > costValues[1]) {
        dispatch(setCost([0, costValues[1]]));
      } else {
        dispatch(setCost([Number(value), costValues[1]]));
        dispatch(costActive(true));
        if (otherfilter) dispatch(setActiveNumbers("sm"))
      }
    }
 
  };

  const inputToHandler = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value)) {
      if (
        Number(value) > 25000000 ||
        (Number(value).length === costValues[0].length &&
          Number(value) < costValues[0])
      ) {
        dispatch(setCost([costValues[0], 25000000]));
      } else {
        dispatch(setCost([costValues[0], Number(value)]));
        dispatch(costActive(true));
        if (otherfilter) dispatch(setActiveNumbers("sm"))
  
      }
    }
   
  };
useEffect(() => {
  if(deleteAllOtherFilters && otherfilter) {
    dispatch(setCost([0, 25000000]));
    dispatch(costActive(false));
    setDeleteAllOtherFilters(false)
  }
},[otherfilter,deleteAllOtherFilters])
  return (
    <div className={`${otherfilter ? "flex sm:hidden" : "flex"} relative md:shadow-sm flex-col gap-2 pt-5 w-full`}>
      <div className="flex justify-start items-end gap-4 ">
        <div className="w-2 h-10 rounded-tl-2xl rounded-bl-2xl bg-yellow-500"></div>
        <h3 className="text-lg text-gray-700 font-bold">محدوده اجاره بها</h3>
      </div>
      <div className="p-8 w-full" dir="rtl">
        <Range
          values={costValues}
          rtl
          step={getStep(costValues[0])}
          min={MIN}
          max={MAX}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className=" w-full h-1 bg-gray-300 rounded"
              style={{
                background: getTrackBackground({
                  values: costValues,
                  colors: ["#ccc", "#0a84ff", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl: true,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={`thumb-${index}`}
                {...restProps}
                className="outline-none hover:shadow-2xl"
                style={{
                  ...props.style,
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}
                id={`tooltip-${index}`}
                data-tip
              >
                <div className="w-2 h-2 rounded-full bg-[#0a84ff]"></div>
              </div>
            );
          }}
        />
        <div className="flex justify-between items-center gap-4 mt-4">
          <div className="mt-8 w-full">
            <span className="text-sm font-[vazirRegular] mb-4 text-gray-600 ">
              نرخ هرشب از
            </span>
            <div className="w-full rounded-2xl flex items-center gap-3 justify-end border px-3 py-2 placeholder:text-gray-400 border-gray-200">
              <input
                type="text"
                 pattern="\d*"
                placeholder="0"
                value={formatNumber(costValues[0])}
                className="border-none focus:border-none outline-none text-end w-full "
                onChange={(e) => inputFromHandler(e)}
              />
              <span className="text-gray-400 w-9 min-w-9 ">تومان</span>
            </div>
          </div>
          <div className="mt-8 w-full">
            <span className="text-sm font-[vazirRegular] mb-4 text-gray-600 ">
              تا
            </span>
            <div className="w-full rounded-2xl flex items-center gap-3 justify-end border px-3 py-2 placeholder:text-gray-400 border-gray-200">
              <input
                type="text"
                 pattern="\d*"
                placeholder="25000000"
                value={formatNumber(costValues[1])}
                className="border-none focus:border-none outline-none text-end w-full"
                onChange={(e) => inputToHandler(e)}
              />
              <span className="text-gray-400 w-9 min-w-9  ">تومان</span>
            </div>
          </div>
        </div>
        <div className={`flex justify-between items-center mt-4 ${otherfilter ? "hidden" : null}`}>
          <button
            className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 border-dashed hover:border-gray-400 rounded-md"
            onClick={() => {
              dispatch(setCost([0, 25000000]));
              dispatch(costActive(false));
            }}
          >
            <BsTrash3 className="w-5 h-5" />
            <span className="text-sm md:text-base"> پاک کردن </span>
          </button>
          <div className="flex justify-end gap-3 items-center">
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => {
                dispatch(setShowCost(false));
                dispatch(setCost([0, 25000000]));
                dispatch(costActive(false));

              }}
            >
              <IoCloseOutline className="w-5 h-5" />
              <span className="text-sm md:text-base">بیخیال</span>
            </button>
            <button
              className="flex items-center gap-1 px-3 py-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 border-2 rounded-md"
              onClick={() => {
                dispatch(costActive(true)), dispatch(setShowCost(false));
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

export default CostBox;
