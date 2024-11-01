import Image from "next/image";
import { formatPersianDateRange } from "../../../../utils/filter-funcs";
import { useState } from "react";

const AcceptOrReject = ({ reserve , setActiveItem ,setIsSearching , id}) => {
  const [isSending, setisSending] = useState(false);
  const pendingStatusHandler = async (
    status,
    reservedBy,
    firstReservedDate,
    lastReservedDate,
    allReserveDays
  ) => {
    setisSending({ status });
    const res = await fetch(`/api/residance/responseResidance/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        statusres: status,
        reservedBy,
        firstReservedDate,
        lastReservedDate,
        allReserveDays
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 200) {
      setActiveItem(status);
      setIsSearching(true)

    }
    setisSending(false);
  };
  return (
    <div className=" border rounded-xl p-2">
      <p className="font-[vazirRegular]  text-sm text-gray-600 ">
        {reserve?.reservedByUser?.name} {reserve?.reservedByUser?.lastName}{" "}
        درخواست رزرو برای{" "}
        <span className="text-blue-500 ">
          {" "}
          {formatPersianDateRange([
            reserve?.reservedDays[0],
            reserve?.reservedDays[reserve?.reservedDays.length - 1],
          ])}
        </span>{" "}
        برای{" "}
        <span className="text-green-600 text-base">
          {reserve?.numberOfGuest}
        </span>{" "}
        مهمان را دارد
      </p>
      <div className="flex justify-between items-center p-2">
        <button
          onClick={() =>
            pendingStatusHandler(
              "accepted",
              reserve.reservedBy,
              reserve.reservedDays[0],
              reserve.reservedDays[reserve.reservedDays.length - 1],
              reserve.reservedDays
            )
          }
          className="flex outline-none w-36  text-sm justify-center items-center  py-1 rounded-lg gap-1 text-gray-600 font-[vazirRegular]  bg-green-400 hover:bg-green-500 transition-all duration-300"
        >
          قبول درخواست
          {isSending &&
          isSending?.status == "accepted"  ? (
            <Image
              src={"/images/loading.svg"}
              width={22}
              height={22}
              alt="loading"
            />
          ) : null}
        </button>
        <button
          onClick={() =>
            pendingStatusHandler(
              "rejected",
              reserve.reservedBy,
              reserve.reservedDays[0],
              reserve.reservedDays[reserve.reservedDays.length - 1],
              reserve.reservedDays
            )
          }
          className="flex outline-none w-36  text-sm justify-center items-center  py-1 rounded-lg gap-1 text-gray-600 font-[vazirRegular]  bg-red-400 hover:bg-red-500 transition-all duration-300"
        >
          رد کردن
          {isSending &&
          isSending?.status == "rejected" 
          ? (
            <Image
              src={"/images/loading.svg"}
              width={22}
              height={22}
              alt="loading"
            />
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default AcceptOrReject;
