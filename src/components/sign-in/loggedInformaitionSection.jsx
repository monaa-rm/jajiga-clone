"use client";
import {
  setMobileNumber,
  setmobileNumberRegistered,
  setPassword,
  setShowMobileNumber,
  setShowSignIn,
  setUserfullname,
} from "@/store/slices/headerListSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check_phone } from "../../../utils/constants";
import InputBox from "./inputBox";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const LoggedInformationSection = () => {
  const [numNotValid, setNumNotValid] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
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

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#loggedInfoPass")) {
        if (!showMobileNumber && mobileNumberRegistered == -1) {
          dispatch(setShowSignIn(false));
          dispatch(setShowMobileNumber(true));
          dispatch(setMobileNumber(""));
          setName("");
          setLastName("");
          setUserPassword("");
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
    if (!name || !lastName || !userPassword) {
      setNumNotValid(true);
    } else {
try {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      phone: mobileNumber,
      name,
      lastName,
      password: userPassword,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.status == 201) {
    const resToken = await signIn("credentials", {
      phone: mobileNumber,
      password: userPassword,
      name: `${name} ${lastName}`,
      redirect: false,
    });
    toast.success("با موفقیت ثبت نام شدید")
    dispatch(setShowSignIn(false));
    dispatch(setShowMobileNumber(true));
    dispatch(setMobileNumber(""));
    setName("");
    setLastName("");
    setUserPassword("");
    dispatch(setPassword(""));
    dispatch(setmobileNumberRegistered(0));
    dispatch(setUserfullname(`${name} ${lastName}`))
  }
} catch (error) {
  toast.warning("مشکلی پیش آمده است");
}
    }
  };
  return (
    <div
      id="loggedInfoPass"
      className={`px-8 font-[vazirRegular] py-10 bg-white  rounded-tr-2xl rounded-tl-2xl sm:rounded-2xl  transition-all duration-300
    absolute ${
      showSignIn && mobileNumberRegistered == -1
        ? "top-auto sm:top-1/2 translate-y-0 sm:-translate-y-1/2  bottom-0 sm:bottom-auto opacity-100"
        : "-bottom-[500px] sm:bottom-auto sm:-top-[500px] opacity-0"
    } left-1/2  -translate-x-1/2  flex flex-col justify-center items-start  w-full sm:w-[500px] `}
    >
      <div className="w-full flex justify-between items-center py-4">
        <h2 dir="ltr" className="text-gray-700">
          +98{mobileNumber}
        </h2>
        <button
          onClick={() => {
            dispatch(setShowMobileNumber(true));
            dispatch(setmobileNumberRegistered(0));
          }}
          className="px-2 py-1 rounded-lg text-gray-700 bg-gray-200
         hover:bg-gray-300 active:bg-gray-400"
        >
          ویرایش
        </button>
      </div>
      <h2 dir="ltr" className="text-gray-700 my-3 text-xl font-bold">
        ثبت نام
      </h2>
      <span className="text-gray-700 font-[vazirRegular] text-sm ">
        لطفا مشخصات صحیح خود را وارد کنید
      </span>
      <InputBox
        value={name}
        setValue={setName}
        type="text"
        pls="نام"
        numNotValid={numNotValid}
      />
      <InputBox
        value={lastName}
        setValue={setLastName}
        type="text"
        pls="نام خانوادگی"
        numNotValid={numNotValid}
      />
      <InputBox
        value={userPassword}
        setValue={setUserPassword}
        type="password"
        pls="رمز عبور"
        numNotValid={numNotValid}
      />

      <div className="flex justify-center w-full">
        <button
          onClick={() => loginHandler()}
          className="w-52 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-[vazirRegular] "
        >
          ثبت نام
        </button>
      </div>
    </div>
  );
};

export default LoggedInformationSection;
