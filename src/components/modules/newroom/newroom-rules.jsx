"use client";
import { setResRuleActive, setResRules } from "@/store/slices/newRoomSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewroomRules = () => {
  const rulesItems = useSelector((store) => store.newRoomSlice.rules);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setResRuleActive());
  }, []);
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-gray-800 ">همراه داشتن حیوان خانگی</h3>
          <div className="p-1.5 cursor-pointer flex justify-center gap-2 items-center bg-gray-100 rounded-full ">
            <button
              onClick={() =>
                dispatch(setResRules({ rule: "pet", value: true }))
              }
              className={`px-2 py-1.5 rounded-full text-sm text-gray-800 ${
                rulesItems.pet == true
                  ? "bg-yellow-500 rounded-full font-bold"
                  : ""
              } `}
            >
              مجاز
            </button>
            <button
              onClick={() =>
                dispatch(setResRules({ rule: "pet", value: false }))
              }
              className={`px-2 py-1.5 rounded-full text-sm text-gray-800 ${
                rulesItems.pet == false
                  ? "bg-yellow-500 rounded-full font-bold"
                  : ""
              } `}
            >
              ممنوع
            </button>
          </div>
        </div>
        <h5 className="text-sm text-gray-400 ">توضیحات</h5>
        {rulesItems.pet ? (
          <p dir="rtl" className="text-sm text-gray-400">
            ورود حیوان خانگی (سگ، گربه، ...) به شرط رعایت کامل نظافت مجاز است.
            در داخل ساختمان حیوان باید در باکس مخصوص نگهداری شود.
          </p>
        ) : (
          <p dir="rtl" className="text-sm text-gray-400">
            همراه داشتن حیوان خانگی ممنوع است.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 ">
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-gray-800 ">برگزاری جشن و پخش موزیک</h3>
          <div className="p-1.5 cursor-pointer flex justify-center gap-2 items-center bg-gray-100 rounded-full ">
            <button
              onClick={() =>
                dispatch(setResRules({ rule: "party", value: true }))
              }
              className={`px-2 py-1.5 rounded-full text-sm text-gray-800 ${
                rulesItems.party == true
                  ? "bg-yellow-500 rounded-full font-bold"
                  : ""
              } `}
            >
              مجاز
            </button>
            <button
              onClick={() =>
                dispatch(setResRules({ rule: "party", value: false }))
              }
              className={`px-2 py-1.5 rounded-full text-sm text-gray-800 ${
                rulesItems.party == false
                  ? "bg-yellow-500 rounded-full font-bold"
                  : ""
              } `}
            >
              ممنوع
            </button>
          </div>
        </div>
        <h5 className="text-sm text-gray-400 ">توضیحات</h5>
        {rulesItems.party ? (
          <p dir="rtl" className="text-sm text-gray-400">
            برگزاری جشن کوچک با هماهنگی میزبان امکانپذیر است.{" "}
          </p>
        ) : (
          <p dir="rtl" className="text-sm text-gray-400">
            برگزاری جشن و پخش موزیک با صدای بلند ممنوع است
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 ">
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-gray-800 ">
            استعمال دخانیات (سیگار، قلیان و ...) در فضای داخلی ساختمان
          </h3>
          <div className="p-1.5 cursor-pointer flex justify-center gap-2 items-center bg-gray-100 rounded-full ">
            <button
              onClick={() =>
                dispatch(setResRules({ rule: "smoke", value: true }))
              }
              className={`px-2 py-1.5 rounded-full text-sm text-gray-800 ${
                rulesItems.smoke == true
                  ? "bg-yellow-500 rounded-full font-bold"
                  : ""
              } `}
            >
              مجاز
            </button>
            <button
              onClick={() =>
                dispatch(setResRules({ rule: "smoke", value: false }))
              }
              className={`px-2 py-1.5 rounded-full text-sm text-gray-800 ${
                rulesItems.smoke == false
                  ? "bg-yellow-500 rounded-full font-bold"
                  : ""
              } `}
            >
              ممنوع
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <h3 className="text-sm text-gray-600 w-40 min-w-40">افزودن مقررات بیشتر</h3>
        <textarea
          value={rulesItems.extrarules[0]}
          onChange={(e) =>
            dispatch(setResRules({ rule: "extrarules", value: e.target.value }))
          }
          className="rounded-lg w-full outline-none border border-gray-200 focus:border-gray-300 hover:border-gray-300 p-3 "
          rows={3}
        />
      </div>
    </div>
  );
};

export default NewroomRules;
