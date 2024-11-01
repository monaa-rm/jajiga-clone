"use client";
import { setDiscountCost, setResCost } from "@/store/slices/newRoomSlice";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const discountList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const NewroomCost = () => {
  const [showDiscountList, setShowDiscountList] = useState(false);
  const discountcost = useSelector((store) => store.newRoomSlice.discount);
  const costs = useSelector((store) => store.newRoomSlice.price);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#discountId")) {
        setShowDiscountList(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showDiscountList]);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const notHolidaysHandler = (e) => {
    const newValue = Number(e.target.value.replace(/,/g, ""));
    if (!isNaN(newValue)) {
      dispatch(setResCost({ days: "notHolidays", cost: newValue }));
    }
  };
  const holidaysHandler = (e) => {
    const newValue = Number(e.target.value.replace(/,/g, ""));
    if (!isNaN(newValue)) {
      dispatch(setResCost({ days: "holidays", cost: newValue }));
    }
  };
  const extraHandler = (e) => {
    const newValue = Number(e.target.value.replace(/,/g, ""));
    if (!isNaN(newValue)) {
      dispatch(setResCost({ days: "extra", cost: newValue }));
    }
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="text-gray-800 font-bold"> نرخ اقامتگاه</h3>
      <div className="flex flex-col md:flex-row gap-2 justify-start items-start md:items-center">
        <span className="text-sm text-gray-800  w-52 min-w-52">
          نرخ روز های عادی
        </span>
        <div
          className="flex justify-center items-center gap-2 w-[250px] sm:w-[300px] rounded-lg border border-gray-200 hover:border-gray-300
         focus:border-gray-300 transition-all duration-300 px-3 py-2"
        >
          <input
            dir="ltr"
            type="text"
            value={formatNumber(costs.notHolidays)}
            pattern="\d*"
            onChange={(e) => notHolidaysHandler(e)}
            className="w-[200px] sm:w-[250px] outline-none"
          />
          <span className="text-sm text-gray-500 ">تومان</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 justify-start items-start md:items-center">
        <span className="text-sm text-gray-800 w-52 min-w-52">
          نرخ جمعه و روزهای تعطیل{" "}
        </span>
        <div
          className="flex justify-center items-center gap-2 w-[250px] sm:w-[300px] rounded-lg border border-gray-200 hover:border-gray-300
         focus:border-gray-300 transition-all duration-300 px-3 py-2"
        >
          <input
            dir="ltr"
            type="text"
            value={formatNumber(costs.holidays)}
            pattern="\d*"
            onChange={(e) => holidaysHandler(e)}
            className="w-[200px] sm:w-[250px] outline-none"
          />
          <span className="text-sm text-gray-500 ">تومان</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 justify-start items-start md:items-center">
        <span className="text-sm text-gray-800 w-52 min-w-52">
          نرخ نفر اضافه{" "}
        </span>
        <div
          className="flex justify-center items-center gap-2 w-[250px] sm:w-[300px] rounded-lg border border-gray-200 hover:border-gray-300
         focus:border-gray-300 transition-all duration-300 px-3 py-2"
        >
          <input
            dir="ltr"
            type="text"
            value={formatNumber(costs.extra)}
            pattern="\d*"
            onChange={(e) => extraHandler(e)}
            className="w-[200px] sm:w-[250px] outline-none"
          />
          <span className="text-sm text-gray-500 ">تومان</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-3 text-gray-600 text-sm pt-4">
        <span className=" w-52 min-w-52  ">تخفیف</span>

        <div className={` md:relative w-full md:w-80 `}>
          <div
            onClick={() => {
              setShowDiscountList(true);
            }}
            className={` py-2 px-3 w-full sm:w-[300px]  overflow-hidden flex justify-between items-center border
           border-gray-200  transition-all duration-200  rounded-lg hover:border-gray-300  cursor-pointer`}
          >
            <div className="flex justify-start items-center gap-3">
              <span>{discountcost == 0 || discountcost == undefined ? "بدون تخفیف" : `${discountcost} درصدی`}</span>
            </div>
            <FaAngleDown className="w-3 h-3" />
          </div>
          <div
            className={`cityz transition-all duration-700 ${
              showDiscountList
                ? " fixed md:static w-full min-h-96 md:min-h-0 md:h-0 md:w-0 top-0 right-0 bottom-0 left-0 bg-black md:bg-none bg-opacity-60"
                : "top-full"
            }`}
          ></div>
          <div
            id="discountId"
            className={`bg-white z-[902] shadowstyle rounded-lg fixed md:absolute  left-0 bottom-0 md:top-0  md:h-80 w-full 
          overflow-hidden border-gray-300 ${
            showDiscountList ? " top-20 md:block" : "md:hidden top-full  "
          }  transition-all duration-300`}
          >
            <div className=" border pt-2 px-2 overflow-y-scroll h-full  ">
              {discountList.length &&
                discountList?.map((item, i) => (
                  <div
                    onClick={() => {
                      dispatch(setDiscountCost(item));
                      setShowDiscountList(false);
                    }}
                    key={i}
                    className={`px-3 py-3 ${
                      discountcost == item ? "bg-gray-50" : "bg-none"
                    } border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-300`}
                  >
                    {item == 0 ? "بدون تخفیف" : ` ${item} درصدی`}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewroomCost;
