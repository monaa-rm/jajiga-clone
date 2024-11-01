"use client";
import { useDispatch, useSelector } from "react-redux";
import Numbersection from "./numbersection";
import {
  setMobileNumber,
  setmobileNumberRegistered,
  setPassword,
  setShowMobileNumber,
  setShowSignIn,
} from "@/store/slices/headerListSlice";
import { useEffect } from "react";
import PasswordSection from "./passwordSection";
import LoggedInformationSection from "./loggedInformaitionSection";

const SignInSection = () => {
  const showSignIn = useSelector((store) => store.headerListSlice.showSignIn);
  const mobileNumberRegistered = useSelector(
    (store) => store.headerListSlice.mobileNumberRegistered
  );
  const showMobileNumber = useSelector(
    (store) => store.headerListSlice.showMobileNumber
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (showSignIn) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showSignIn]);

  return (
    <div
      className={` z-[1000] fixed  left-0 right-0 ${
        showSignIn
          ? "top-0 bottom-0  bg-black bg-opacity-60"
          : "  bg-none bg-opacity-0 top-full sm:top-0 bottom-0 sm:bottom-full"
      } transition-all duration-500   `}
    >
      <Numbersection />
      <PasswordSection />
      <LoggedInformationSection />

    </div>
  );
};

export default SignInSection;
