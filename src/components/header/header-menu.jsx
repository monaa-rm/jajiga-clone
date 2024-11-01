"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";
import HeaderMenuList from "./header-menu-list";
import { useDispatch } from "react-redux";
import {
  notShowList,
  setShowSignIn,
  showList,
} from "@/store/slices/headerListSlice";
import { useSession } from "next-auth/react";

const HeaderMenu = ({ pathname }) => {
  const [decrease, setDescrease] = useState(false);
  const { data, status } = useSession();

  const dispatch = useDispatch();
  return (
    <div
      className={`flex justify-start ${
        pathname == "/"
          ? "gap-8"
          : "w-20 min-w-20 md:w-[450px] md:min-w-[450px] gap-2 md:gap-4 lg:gap-8"
      } items-center `}
    >
      <div
        onClick={() => dispatch(showList())}
        className={`flex ${
          pathname == "/" ? "border-0" : "border border-gray-300 "
        } items-center cursor-pointer justify-center gap-1 pr-3 rounded-full bg-[#ffffff54]`}
      >
        <IoIosMenu className="size-6" />
        <PiUserCircleLight
          className={`size-10 rounded-full opacity-85 ${
            pathname == "/" ? "text-gray-100" : "text-gray-300"
          }`}
        />
      </div>
      {status == "authenticated" ? (
        <Link
          href={"/notifications"}
          className={`${
            pathname == "/" ? "text-white text-lg" : "text-gray-600 text-base"
          } cursor-pointer hidden md:block`}
        >
          اعلانات
        </Link>
      ) : (
        <div
          onClick={() => {
            dispatch(setShowSignIn(true));
            dispatch(notShowList());
          }}
          className={`${
            pathname == "/" ? "text-white text-lg" : "text-gray-600 text-base"
          } cursor-pointer hidden md:block`}
        >
          ورود / ثبت نام
        </div>
      )}
      {status == "authenticated" ? (
        <Link
          href={"/reserves"}
          className={`${
            pathname == "/" ? "text-white text-lg" : "text-gray-600 text-base"
          } cursor-pointer hidden md:block`}
        >
          رزرو ها
        </Link>
      ) : (
        <Link
          href={"/host"}
          className={`${
            pathname == "/" ? "text-white text-lg" : "text-gray-600 text-base"
          } cursor-pointer hidden md:block`}
        >
          میزبان شوید
        </Link>
      )}
      {status == "authenticated" ? (
        <Link
          href={"/myrooms"}
          className={`${
            pathname == "/" ? "text-white text-lg" : "text-gray-600 text-base"
          }  cursor-pointer hidden md:block`}
        >
          اقامتگاه ها
        </Link>
      ) : (
        <Link
          href={"/wishes"}
          className={`${
            pathname == "/" ? "text-white text-lg" : "text-gray-600 text-base"
          }  cursor-pointer hidden md:block`}
        >
          علاقه مندی ها
        </Link>
      )}
    </div>
  );
};

export default HeaderMenu;
