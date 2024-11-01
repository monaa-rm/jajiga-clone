"use client";

import { useDispatch, useSelector } from "react-redux";
import { residanceOptions } from "../../../../utils/constants";
import { MdOutlineDone } from "react-icons/md";
import { setResOptions } from "@/store/slices/newRoomSlice";
import { useEffect } from "react";

const NewroomOptions = () => {
  const optionList = useSelector((store) => store.newRoomSlice.options);
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      <p className="text-sm text-gray-800">
        امکانات و تجهیزات موجود در اقامتگاه خود را مشخص کنید
      </p>
      <div className="pt-6 flex flex-col gap-4">
        {residanceOptions.map((item, i) => (
          <div
            key={i}
            className=" w-full flex flex-col md:flex-row gap-4 items-start md:items-center"
          >
            <div className="flex justify-start items-center gap-2 w-52 min-w-52 ">
              {optionList[i].hasIt == false ? (
                <div
                  onClick={() =>
                    dispatch(setResOptions({ name: item.name, hasIt: true }))
                  }
                  className="w-6 h-6 border border-gray-200 hover:border-gray-300 rounded-lg cursor-pointer transition-all duration-300"
                ></div>
              ) : (
                <div
                  onClick={() =>
                    dispatch(setResOptions({ name: item.name, hasIt: false }))
                  }
                  className="w-6 h-6 flex justify-center items-center border border-gray-200 hover:border-gray-300 rounded-lg cursor-pointer bg-black transition-all duration-300"
                >
                  <MdOutlineDone className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="text-sm text-gray-700">{item.title}</span>
            </div>
            {optionList[i].hasIt == true ? (
              <div className="w-full border border-gray-200 rounded-lg focus:border-gray-300 px-3 py-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    dispatch(
                      setResOptions({
                        name: item.name,
                        hasIt: true,
                        description: e.target.value,
                      })
                    )
                  }
                  className="w-full outline-none placeholder:text-gray-400 placeholder:text-sm text-sm text-gray-700 "
                  placeholder={`توضیحات ${item.title}`}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewroomOptions;
