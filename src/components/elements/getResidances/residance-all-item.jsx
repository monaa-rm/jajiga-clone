import Image from "next/image";
import { convertToJalali } from "../../../../utils/calendar-funcs";
import { PiCircleNotchThin, PiEyeThin, PiTrashLight } from "react-icons/pi";
import { IoPowerOutline } from "react-icons/io5";
import { TbDiscount } from "react-icons/tb";
import { useEffect, useState } from "react";
import Link from "next/link";

const ResidanceAllItem = ({ item }) => {
  const [discount, setDiscount] = useState(item.discount);
  const [instance, setInstance] = useState(item.instanceReserve);
  const [showDiscount, setShowDiscount] = useState(false);
  const discountList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const [discountChanging, setDiscountChanging] = useState(false);
  const [instantChanging, setInstantChanging] = useState(false);
  const [itemhidden, setItemHidden] = useState(false);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#discountedit")) {
        setShowDiscount(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showDiscount]);
  const changeDiscount = async (number) => {
    if (discount !== number && !discountChanging) {
      setDiscountChanging(number);

      const res = await fetch(
        `/api/residance/editResidance/${item._id}?whatToChange=discount`,
        {
          method: "PATCH",
          body: JSON.stringify({ discount: number }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status == 200) {
        setDiscount(number);
      }
      setDiscountChanging(false);
    }
  };
  const changeInstanceReserve = async () => {
    setInstantChanging(true);
    const res = await fetch(
      `/api/residance/editResidance/${item._id}?whatToChange=instanceReserve`,
      {
        method: "PATCH",
        body: JSON.stringify({ instanceReserve: !instance }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.status == 200) {
      const data = await res.json();
      setInstance(data.data);
    }
    setInstantChanging(false);
  };
  const deleteHandler = async (id) => {
    const res = await fetch(`/api/residance/editResidance/${id}?`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 200) {
      setItemHidden(true);
      let likedResidances =
      JSON.parse(localStorage.getItem("likedResidances")) || [];
      likedResidances = likedResidances.filter(id => id !== item._id);
      localStorage.setItem('likedResidances', JSON.stringify(likedResidances));

    }
  };

  return (
    <div
      className={`w-full flex justify-center pt-8 ${itemhidden && "hidden"}`}
    >
      <div className="w-full max-w-80  shadow-md  rounded-2xl relative overflow-hidden">
        <div className="w-full h-48 relative rounded-tr-2xl rounded-tl-2xl ">
          <Image
            src={item.images[0]}
            fill
            alt="image"
            className="object-cover rounded-tr-2xl rounded-tl-2xl "
          />
          {item.pending ? (
            <div
              className={`absolute top-5 right-0 bg-white bg-opacity-60 px-2 py-1 rounded-tl-full rounded-bl-full text-gray-700 flex items-center justify-normal gap-2 `}
            >
              <PiCircleNotchThin className="w-5 h-5" />
              <span className="text-sm ">در انتظار بررسی</span>
            </div>
          ) : null}
          <div className="absolute bottom-0 w-full text-white py-1 px-2 bg-black bg-opacity-60 rounded-tr-2xl rounded-tl-2xl">
            {convertToJalali(item.createdAt)}
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-2 pt-3 px-3 ">
          <Link
            href={`/room/${item._id}`}
            className="flex outline-none w-32  justify-center items-center px-3 py-1 gap-1 text-gray-600 font-[vazirRegular]  rounded-lg bg-gray-200 hover:bg-gray-300 transition-all duration-300"
          >
            <PiEyeThin className="w-4 h-4" />
            <span className="text-sm">مشاهده</span>
          </Link>
          <button
            onClick={() => deleteHandler(item._id)}
            type="button"
            className="flex outline-none w-32  justify-center items-center px-3 py-1 rounded-lg gap-1 text-gray-600 font-[vazirRegular]  bg-gray-200 hover:bg-gray-300 transition-all duration-300"
          >
            <PiTrashLight className="w-4 h-4" />
            <span className="text-sm">حذف</span>
          </button>
        </div>
        <div className="w-full flex justify-between items-center gap-2 py-3 px-3 ">
          <button
            onClick={() => changeInstanceReserve()}
            type="button"
            className={`flex outline-none justify-center items-center w-32  py-1 gap-1 text-gray-600 font-[vazirRegular]  rounded-lg ${
              instance
                ? "bg-green-400 hover:bg-green-500"
                : "bg-red-300 hover:bg-red-400"
            } transition-all duration-300`}
          >
            <IoPowerOutline className="w-4 h-4" />
            <span className="text-sm">رزرو فوری</span>
          </button>
          <button
            onClick={() => setShowDiscount(true)}
            type="button"
            className="flex outline-none w-32  justify-center items-center   py-1 gap-1 text-gray-600 font-[vazirRegular]  rounded-lg bg-yellow-200 hover:bg-yellow-300 transition-all duration-300"
          >
            <TbDiscount className="w-4 h-4" />
            <span className="text-sm">میزان تخفیف</span>
          </button>
        </div>
        <div
          className={`bg-black  absolute transition-all duration-300 ${
            showDiscount ? " top-0  bg-opacity-70" : "top-full opacity-0"
          } right-0 left-0 bottom-0 rounded-2xl`}
        ></div>
        <div
          className={`px-2 w-full absolute transition-all duration-300 ${
            showDiscount ? "bottom-12" : "bottom-[-3rem]"
          } `}
          id="discountedit"
        >
          <div
            className={`w-full rounded-2xl bg-white overflow-hidden border border-gray-300 shadow-sm shadow-gray-300 flex justify-between items-center`}
          >
            {discountList.map((item) => (
              <div
                onClick={() => changeDiscount(item)}
                key={item}
                className={` w-[10%] h-full z-10 border-l border-gray-300 py-2 cursor-pointer flex justify-center items-center text-gray-600 ${
                  discount == item
                    ? "bg-yellow-400 hover:bg-yellow-400"
                    : "bg-white hover:bg-gray-100"
                } transition-all duration-300`}
              >
                {discountChanging === item ? (
                  <Image
                    width={15}
                    height={15}
                    alt="o"
                    src={"/images/loading.svg"}
                  />
                ) : (
                  item
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidanceAllItem;
