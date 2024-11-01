"use client";
import { useState } from "react";

const PasswordElement = ({ userId }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordValid, setRepeatPasswordValid] = useState(true);
  const changePasswordHandler = async () => {
    if (password !== repeatPassword) {
      setPasswordValid(false);
      setRepeatPasswordValid(false);
    }
    if (!password || password !== repeatPassword) {
      setPasswordValid(false);
    }
    if (!repeatPassword || password !== repeatPassword) {
      setRepeatPasswordValid(false);
    }
    if (password && repeatPassword && password === repeatPassword) {
      const res = await fetch(`/api/auth/user?itemtype=password`, {
        method: "PATCH",
        body: JSON.stringify({ password, repeatPassword, userId }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status == 200) {
        setShowPassword(false);
        setPassword("");
        setRepeatPassword("");
      }
      const data = await res.json();
      if (data.error) {
        setPasswordValid(false);
        setRepeatPasswordValid(false);
        setPassword("");
        setRepeatPassword("");
      }
    }
  };
  return (
    <div>
      {showPassword ? null : (
        <button
          onClick={() => setShowPassword(true)}
          className=" w-32 h-10 flex justify-center items-center bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300 transition-all duration-300"
        >
          تغییر رمز عبور
        </button>
      )}
      {showPassword ? (
        <div className=" flex flex-col w-full gap-3 ">
          <div
            className={` flex items-center justify-between gap-1 w-full border-b ${
              passwordValid ? " border-gray-300 " : " border-red-500 "
            } `}
          >
            <div className="flex flex-col gap-2 justify-start w-full py-3">
              <h1 className="text-lg text-gray-800">رمز عبور جدید</h1>
              <input
                type="password"
                value={password}
                maxLength={16}
                minLength={0}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!passwordValid) setPasswordValid(true);
                }}
                className={`
                font-[vazirRegular] outline-none w-full border-none `}
              />
            </div>
          </div>
          <div
            className={` flex items-center justify-between gap-1 w-full border-b ${
              repeatPasswordValid ? " border-gray-300 " : "  border-red-500"
            } `}
          >
            {" "}
            <div className="flex flex-col gap-2 justify-start w-full py-3">
              <h1 className="text-lg text-gray-800"> تکرار رمز عبور</h1>
              <input
                type="password"
                value={repeatPassword}
                maxLength={16}
                minLength={0}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                  if (!repeatPasswordValid) setRepeatPasswordValid(true);
                }}
                className={`
                font-[vazirRegular] outline-none w-full border-none `}
              />
            </div>
          </div>
          <button
            onClick={() => changePasswordHandler()}
            className=" w-32 h-10 flex justify-center items-center bg-yellow-500 rounded-md text-sm text-gray-700 hover:bg-yellow-600 transition-all duration-300"
          >
            تایید رمز عبور
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PasswordElement;
