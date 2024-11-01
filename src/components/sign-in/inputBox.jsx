"use client";

import { useState } from "react";

const InputBox = ({ value, setValue, type, pls , numNotValid }) => {
  const [placeHolder, setPlaceHolder] = useState(false);
  return (
    <>
      <div
        onFocus={() => setPlaceHolder(true)}
        onBlur={() => setPlaceHolder(false)}
        className={`rounded-lg  mt-1 border px-3 ${
          numNotValid && !value
            ? "border-red-500 mb-6"
            : "border-gray-300 mb-4 focus:border-gray-400 hover:border-gray-400 "
        } 
      flex justify-start items-center w-full h-10 relative`}
      >
        <input
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          dir="ltr"
          type={type}
          className="w-full outline-none h-full"
        />

        <span
          className={`bg-white  text-gray-500 font-[vazirRegular]  px-1 absolute ${
            placeHolder || value
              ? "-top-2 text-xs"
              : " top-1/2 -translate-y-1/2 text-sm "
          } transition-all duration-300`}
        >
          {pls}
        </span>
      {numNotValid && !value ? (
        <div className="text-center absolute top-full pt-1 w-full sm:text-start text-red-500 text-xs">
       {pls} معتبر نیست
        </div>
      ) : null}
      </div>
    </>
  );
};

export default InputBox;
