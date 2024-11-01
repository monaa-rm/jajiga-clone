"use client";
import Image from "next/image";
import SingleRoomBreadCrumb from "../elements/single-room-bread-crumb";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";
import { IoCloseSharp, IoHomeOutline } from "react-icons/io5";
import { PiRuler } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import { BsDoorOpen } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import {
  formatNumberToPersian,
  otherUserRedidances,
} from "../../../utils/constants";
import OtherResidanceBox from "../elements/other-residance-box";
import BedInformation from "../elements/bed-informatin";
import ResidanceOptions from "../elements/residance-options";
import CalendarPrice from "../elements/calendar-price";
import ResidanceRules from "../elements/residance-rules";
import dynamic from "next/dynamic";
const DynamicResidanceMap = dynamic(() => import("../elements/residance-map"), {
  ssr: false,
});
import ResidanceAside from "../elements/residance-aside";
import ResidanceNav from "../residance-nav";
import { Element } from "react-scroll";
import { useSelector } from "react-redux";
import { convertShamsiToDayObject } from "../../../utils/calendar-funcs";
import { useSession } from "next-auth/react";

const ResidanceInformation = ({
  userData,
  data,
  userOtherResidances,
  reqId,
}) => {
  const [rating, setRating] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asideSticky, setAsideSticky] = useState(false);
  const [showMdBox, setShowMdBox] = useState(false);
  const showBox = useSelector((store) => store.headerListSlice.showSearchBox);
  const [singleValue, setSingleValue] = useState(null);
  const [reserves, setReserves] = useState([]);
  const [myReserves, setMyReseves] = useState([]);
  const { data: session, status } = useSession();
  useEffect(() => {
    // فیلتر و تبدیل به فرمت مورد نظر
    const rsrv = data.reservedDays
      .filter((item) => {
        if (status === "authenticated") {
          return (
            item.acceptMode === "accepted" ||
            (item.acceptMode === "pending" && item.reservedBy == reqId._id)
          );
        } else {
          return item.acceptMode === "accepted";
        }
      })
      .flatMap((item) =>
        item?.reservedDays.map((date, i) => {
          const dayObject = convertShamsiToDayObject(date);
          return {
            ...dayObject,
            acceptMode: item?.acceptMode,
            situation:
              i == 0
                ? "start"
                : i == item?.reservedDays.length - 1
                ? "end"
                : "middle",
          };
        })
      );
    // مرحله 1: مرتب‌سازی اولیه بر اساس تاریخ
    let sortedRsrv = rsrv.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      if (a.month !== b.month) return a.month - b.month;
      if (a.day !== b.day) return a.day - b.day;
      return 0;
    });

    // مرحله 2: تنظیم وضعیت‌ها بر اساس وضعیت روز قبلی
    let finallyReserves = [];
    const result = sortedRsrv.map((item, i) => {
      if (
        i > 1 &&
        i != 1 &&
        item.day == finallyReserves[finallyReserves.length - 1].day &&
        item.month == finallyReserves[finallyReserves.length - 1].month &&
        item.year == finallyReserves[finallyReserves.length - 1].year
      ) {
        if (
          (finallyReserves[finallyReserves.length - 1].acceptMode ==
            "pending" &&
            item.acceptMode == "pending") ||
          (finallyReserves[finallyReserves.length - 1].acceptMode ==
            "accepted" &&
            item.acceptMode == "accepted")
        ) {
          finallyReserves.push(item);
        } else if (
          item.acceptMode == "pending" &&
          finallyReserves[finallyReserves.length - 1].acceptMode == "accepted"
        ) {
          if (
            finallyReserves[finallyReserves.length - 2].acceptMode == "accepted"
          ) {
            finallyReserves.push(item);
          } else {
            const lastItem = finallyReserves.pop();
            finallyReserves.push(item);
            finallyReserves.push(lastItem);
          }
        } else if (
          item.acceptMode == "accepted" &&
          finallyReserves[finallyReserves.length - 1].acceptMode == "pending"
        ) {
          if (
            finallyReserves[finallyReserves.length - 2].acceptMode == "pending"
          ) {
            finallyReserves.push(item);
          } else {
            const lastItem = finallyReserves.pop();
            finallyReserves.push(item);
            finallyReserves.push(lastItem);
          }
        }
      } else {
        finallyReserves.push(item);
      }
    });

    // به روز رسانی `reserves`

    setReserves(finallyReserves);
  }, [data.reservedDays, status]);

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      var aside = document.querySelector("#aside");
      var littleBox = document.querySelector("#littleBox");
      if (aside) {
        if (window.scrollY > 360) {
          setAsideSticky(true);
        } else {
          setAsideSticky(false);
        }
      }
    });
  });
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#littleBox")) {
        setShowMdBox(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showMdBox]);
  useEffect(() => {
    if (showMdBox) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showMdBox]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      var navResidance = document.querySelector("#navResidance");
      if (navResidance) {
        if (window.scrollY > 600) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    });
  });
  return (
    <section className="w-full flex justify-between items-start py-6 relative ">
      <ResidanceNav showNav={showNav} setShowNav={setShowNav} />
      <div
        className={`absolute ${
          showMdBox ? "-top-[31rem]" : "top-full"
        } bottom-0 right-0 left-0 bg-black bg-opacity-60 z-[701] transition-all duration-500 ease-in-out`}
      >
        <IoCloseSharp
          className="w-8 h-8 text-white absolute top-[42rem] left-4 "
          onClick={() => setShowMdBox(false)}
        />
        <div
          id="littleBox"
          className={`w-full bg-white rounded-tr-2xl rounded-tl-2xl overflow-hidden fixed max-h-[600px] transition-all duration-700 ${
            showMdBox ? " top-[11rem]" : "top-full"
          } `}
        >
          <ResidanceAside
            littleBox={true}
            discount={data.discount}
            price={data.price}
            asideSticky={asideSticky}
            capacity={data.capacity}
            userId={data.userId}
            reqId={reqId}
            max_capacity={data.maxCapacity}
            singleValue={singleValue}
            setSingleValue={setSingleValue}
            rsrvs={reserves}
          />
        </div>
      </div>
      <div className=" w-full md:w-2/3 flex flex-col justify-start items-start gap-2 relative px-2">
        <div
          className={` sticky ${
            showBox ? "top-full" : "bottomResidanceBoxstyle"
          } transition-all duration-300   w-full  rounded-2xl z-[700] h-20 bg-[rgba(0,0,0,0.6)]  
          backdrop-blur-sm ${isModalOpen ? "hidden" : "block md:hidden"} `}
        >
          <div className="w-full flex h-full justify-between items-center p-3 ">
            <div className="text-sm text-white">
              {" "}
              هرشب از{" "}
              <span className="text-lg ">
                {data.price.holidays > data.price.notHolidays
                  ? formatNumberToPersian(data.price.notHolidays)
                  : formatNumberToPersian(data.price.holidays)}
              </span>{" "}
              تومان
            </div>
            <button
              onClick={() => setShowMdBox(true)}
              className="text-gray-700 bg-[rgb(240,200,7)] hover:bg-[rgb(223,187,6)] 
            px-4 py-3 rounded-full transition-all duration-300"
            >
              درخواست رزرو
            </button>
          </div>
        </div>
        <Element
          name="details"
          className="w-full flex flex-col justify-start items-start gap-2 relative"
        >
          <div className="w-full  flex justify-between items-start gap-3  ">
            <div className="flex flex-col gap-2">
              <SingleRoomBreadCrumb
                city={data.address.city}
                province={data.address.province}
              />
              <h1 className="text-gray-800 text-lg">
                {" "}
                اجاره {data.type_residance.title} در {data.address.city.name}
              </h1>
            </div>
            <div className="w-20 h-20 rounded-full relative">
              {userData.image ? (
                <Image
                  src={userData.image}
                  alt="image"
                  fill
                  className="object-cover rounded-full"
                />
              ) : null}
            </div>
          </div>
          <div className="">
            <div className="flex justify-start items-center gap-3">
              <span className="py-1 text-xs px-2 bg-yellow-400 text-gray-600 rounded-full">
                کد: {data._id}
              </span>
              <div dir="ltr" className=" flex flex-wrap items-center gap-2">
                <span dir="rtl" className="text-xs text-gray-600">
                  ( {data?.rating_number?.length} نظر)
                </span>
                <span className="text-xs text-gray-600"> 4.2</span>
                <Rating
                  className="dir_ltr"
                  readOnly={true}
                  style={{ maxWidth: 80, direction: "ltr" }}
                  itemStyles={myStyles}
                  onChange={setRating}
                />
              </div>
            </div>
          </div>

          <div className=" flex  justify-around items-center bg-gray-100 w-full py-3 px-4 text-gray-600 rounded-md">
            <div className="flex flex-col justify-center items-center gap-2">
              <IoHomeOutline className="w-7 h-7 sm:w-10 sm:h-10" />
              <span className="text-xs sm:text-sm">
                {data.exclusive ? "دربست" : "نیمه دربست"}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <LuUsers className="w-7 h-7 sm:w-10 sm:h-10" />
              <span className="text-xs sm:text-sm">
                تا {data.maxCapacity} مهمان
              </span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <BsDoorOpen className="w-7 h-7 sm:w-10 sm:h-10" />
              <span className="text-xs sm:text-sm"> {data.room} اتاق خواب</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <PiRuler className="w-7 h-7 sm:w-10 sm:h-10" />
              <span className="text-xs sm:text-sm"> {data.area} متر</span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start py-2 gap-2">
            <h1 className="text-xl text-gray-800 mb-3 mt-2">درباره اقامتگاه</h1>
            <h2 className="text-base  text-gray-700">
              {data.type_residance.title} در {data.address.city.name}
            </h2>
            <p className="text-gray-600 text-justify text-sm font-[vazirregular]">
              {data.about}
            </p>
          </div>

          {userOtherResidances.length ? (
            <div className="py-2 border-t border-gray-300  w-full  ">
              <h1 className="text-xl text-gray-800  mt-2">
                سایر اقامتگاه‌های {userData.name}
              </h1>
              <div className="w-full" dir="rtl">
                <OtherResidanceBox userOtherResidances={userOtherResidances} />
              </div>
            </div>
          ) : null}
          <div className="py-2 border-t border-gray-300 w-full">
            <h1 className="text-xl text-gray-800 mb-3 mt-2">فضای اقامتگاه</h1>
            <div className="grid grid-cols-2 ">
              <div className="flex gap-1 py-2">
                <span className="text-sm  font-[vazirregular]  font-bold text-gray-800">
                  ظرفیت استاندارد:
                </span>
                <span className="text-sm text-gray-600">
                  {data.capacity} نفر
                </span>
              </div>
              <div className="flex gap-1 py-2">
                <span className="text-sm  font-[vazirregular]  font-bold text-gray-800">
                  حد اکثر ظرفیت:
                </span>
                <span className="text-sm text-gray-600">
                  {data.maxCapacity} نفر
                </span>
              </div>
              <div className="flex gap-1 py-2">
                <span className="text-sm  font-[vazirregular]  font-bold text-gray-800">
                  متراژ زیربنا:
                </span>
                <span className="text-sm text-gray-600">{data.area} متر</span>
              </div>
              <div className="flex gap-1 py-2">
                <span className="text-sm  font-[vazirregular]  font-bold text-gray-800">
                  متراژ محوطه:
                </span>
                <span className="text-sm text-gray-600">{data.yard} متر</span>
              </div>
              <div className="flex gap-1 py-2">
                <span className="text-sm  font-[vazirregular]  font-bold text-gray-800">
                  نوع اقامتگاه:
                </span>
                <span className="text-sm text-gray-600">
                  {data.type_residance.title}
                </span>
              </div>
              <div className="flex gap-1 py-2">
                <span className="text-sm  font-[vazirregular]  font-bold text-gray-800">
                  منطقه اقامتگاه:
                </span>
                <span className="text-sm text-gray-600">
                  {data.region.title}
                </span>
              </div>
            </div>
          </div>

          <div className="py-2 border-t  border-gray-300 w-full  overflow-hidden ">
            <div className="flex justify-start gap-1 mb-3 mt-2 items-center">
              <h1 className="text-xl text-gray-800 ">فضای خواب</h1>
              {data.room == 0 ? (
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  بدون اتاق خواب
                </span>
              ) : (
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  {data.room} اتاق خواب
                </span>
              )}
            </div>
            <div className="w-[100%] max-w-[100%] otherrsidance overflow-x-scroll">
              <div className=" w-[100%] flex justify-start items-strat py-1 gap-3">
                {data.bedroom.map((item, i) => (
                  <BedInformation
                    item={item}
                    key={i}
                    num={i + 1}
                    common={data.bedroom.length - 1 == i ? true : false}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="py-2 border-t  border-gray-300 w-full  overflow-hidden ">
            <h1 className="text-xl text-gray-800 mb-3 mt-2 ">امکانات</h1>
            <ResidanceOptions dataOptions={data.options} />
          </div>
        </Element>
        <Element
          name="price"
          className="py-2 border-t  border-gray-300 w-full  overflow-hidden "
        >
          <h1 className="text-xl text-gray-800 mb-3 mt-2 ">تقویم / نرخ</h1>
          <CalendarPrice
            price={data.price}
            singleValue={singleValue}
            setSingleValue={setSingleValue}
            reservedDays={reserves}
          />
        </Element>
        <Element
          name="rules"
          className="py-2 border-t  border-gray-300 w-full  overflow-hidden "
        >
          <h1 className="text-xl text-gray-800 mb-3 mt-2 ">مقررات اقامتگاه</h1>
          <ResidanceRules rulesData={data.rules} checktime={data.checktime} />
        </Element>
        <Element
          name="map"
          className={`py-2 border-t  border-gray-300 w-full  overflow-hidden `}
        >
          <h1 className="text-xl text-gray-800 mb-3 mt-2 ">نقشه</h1>
          <DynamicResidanceMap
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            position={data.location}
          />
        </Element>
        <Element
          name="comments"
          className={`py-2 border-t  border-gray-300 w-full h-96  overflow-hidden `}
        >
        </Element>
        <div
          className={`modalmap p-0 border-t  border-gray-300 w-full  overflow-hidden ${
            isModalOpen
              ? " z-[502] fixed top-0 right-0 left-0 bottom-0  flex justify-center items-end sm:items-center bg-black bg-opacity-50"
              : "hidden"
          }`}
        >
          <MdClose
            className="w-8 h-8 cursor-pointer text-white fixed top-5 left-3"
            onClick={() => setIsModalOpen(false)}
          />
          <DynamicResidanceMap
            showModal={true}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            position={data.location}
          />
        </div>
      </div>

      <aside
        id="aside"
        className={`hidden md:block px-0 z-[500]  w-1/3  min-w-[33.333333%] ${
          asideSticky
            ? " sticky left-0  md:pl-2 top-0 xl:pl-0 lg:pr-2 xl:pr-9 "
            : " md:pl-2 lg:pr-2 xl:pl-0  xl:pr-9"
        } `}
      >
        <ResidanceAside
          discount={data.discount}
          price={data.price}
          asideSticky={asideSticky}
          capacity={data.capacity}
          max_capacity={data.maxCapacity}
          userId={data.userId}
          reqId={reqId}
          residanceId={data._id}
          singleValue={singleValue}
          setSingleValue={setSingleValue}
          rsrvs={reserves}
        />
      </aside>
    </section>
  );
};

export default ResidanceInformation;
