"use client";
import {
  setMobileNumber,
  setmobileNumberRegistered,
  setPassword,
  setShowMobileNumber,
  setShowSignIn,
} from "@/store/slices/headerListSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check_phone } from "../../../utils/constants";
import { signIn } from "next-auth/react";

const PasswordSection = () => {
  const [placeHolder, setPlaceHolder] = useState(false);
  const [numNotValid, setNumNotValid] = useState(false);
  const dispatch = useDispatch();

  const password = useSelector((store) => store.headerListSlice.password);
  const mobileNumber = useSelector(
    (store) => store.headerListSlice.mobileNumber
  );
  const showSignIn = useSelector((store) => store.headerListSlice.showSignIn);
  const showMobileNumber = useSelector(
    (store) => store.headerListSlice.showMobileNumber
  );
  const mobileNumberRegistered = useSelector(
    (store) => store.headerListSlice.mobileNumberRegistered
  );
  const userfullname = useSelector(
    (store) => store.headerListSlice.userfullname
  );
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#passId")) {
        if (!showMobileNumber && mobileNumberRegistered == 1) {
          dispatch(setShowSignIn(false));
          dispatch(setShowMobileNumber(true));
          dispatch(setMobileNumber(""));
          dispatch(setPassword(""));
          dispatch(setmobileNumberRegistered(0));
        }
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showSignIn, showMobileNumber]);

  const loginHandler = async () => {
    const res = await signIn("credentials", {
      phone: mobileNumber,
      password: password,
      name : userfullname,
      redirect: false,
    });

    if (res.error) {
      setNumNotValid(res.error);
    } else {
      dispatch(setShowSignIn(false));
      dispatch(setShowMobileNumber(true));
      dispatch(setMobileNumber(""));
      dispatch(setPassword(""));
      dispatch(setmobileNumberRegistered(0));
    }
    
  };
  return (
    <div
      id="passId"
      className={`px-8 font-[vazirRegular] py-10 bg-white  rounded-tr-2xl rounded-tl-2xl sm:rounded-2xl  transition-all duration-300
    absolute ${
      showSignIn && mobileNumberRegistered == 1
        ? "top-auto sm:top-1/2 translate-y-0 sm:-translate-y-1/2  bottom-0 sm:bottom-auto opacity-100"
        : "-bottom-[500px] sm:bottom-auto sm:-top-[500px] opacity-0"
    } left-1/2  -translate-x-1/2  flex flex-col justify-center items-start gap-5 w-full sm:w-[500px] `}
    >
      <div className="w-full flex justify-between items-center">
        <h2 dir="ltr" className="text-gray-700">
          +98{mobileNumber}
        </h2>
        <button
          onClick={() => {
            dispatch(setShowMobileNumber(true));
            dispatch(setmobileNumberRegistered(0));
            dispatch(setPassword(""));
            setNumNotValid(false)
          }}
          className="px-2 py-1 rounded-lg text-gray-700 bg-gray-200
         hover:bg-gray-300 active:bg-gray-400"
        >
          ویرایش
        </button>
      </div>
      <span className="text-gray-700 font-[vazirRegular] ">
        لطفا رمز عبور خود را وارد کنید
      </span>
      <div
        onFocus={() => setPlaceHolder(true)}
        onBlur={() => setPlaceHolder(false)}
        className={`rounded-lg mt-4 border px-3 ${
          numNotValid
            ? "border-red-500 mb-3"
            : "border-gray-300 focus:border-gray-400 hover:border-gray-400 "
        } 
      flex justify-start items-center w-full h-10 relative`}
      >
        <input
          autoComplete="off"
          value={password}
          onChange={(e) => {
            if (numNotValid) setNumNotValid(false);
            dispatch(setPassword(e.target.value));
          }}
          dir="ltr"
          type="password"
          className="w-full outline-none h-full"
        />

        <span
          className={`bg-white  text-gray-500 font-[vazirRegular]  px-1 absolute ${
            placeHolder || password
              ? "-top-2 text-xs"
              : " top-1/2 -translate-y-1/2 text-sm "
          } transition-all duration-300`}
        >
          رمز عبور
        </span>
      {numNotValid ? (
        <div className="text-center w-full absolute top-full pt-1 sm:text-start text-red-500 text-xs">{numNotValid}</div>
      ) : null}
      </div>
      <div className="flex justify-center w-full">
        <button
          onClick={() => loginHandler()}
          className="w-52 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-[vazirRegular] "
        >
          ورود
        </button>
      </div>
    </div>
  );
};

export default PasswordSection;
