"use client";
import Link from "next/link";
import {
  PiInstagramLogoThin,
  PiTelegramLogoThin,
  PiTwitterLogoThin,
  PiUserCircleThin,
  PiYoutubeLogoThin,
} from "react-icons/pi";
import { MdOutlineAddHome } from "react-icons/md";
import { PiQuestionLight } from "react-icons/pi";
import { TbHomeQuestion, TbReservedLine } from "react-icons/tb";
import { MdRule } from "react-icons/md";
import { PiGiftThin } from "react-icons/pi";
import { MdOutlineInstallMobile } from "react-icons/md";
import { BsExclamationSquare, BsHouses } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { AiOutlineComment, AiOutlineSafetyCertificate } from "react-icons/ai";
import { TbHomePlus } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IoExitOutline, IoGiftOutline } from "react-icons/io5";
import { BsExclamationOctagon } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { BiSupport } from "react-icons/bi";
import { useState } from "react";
import { userInfo } from "../../../utils/constants";
import Image from "next/image";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegComments, FaRegUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { notShowList } from "@/store/slices/headerListSlice";
import { signOut, useSession } from "next-auth/react";

const HeaderListContentLoggedIn = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data, status } = useSession();
  return (
    <div
      dir="ltr"
      id="headerlist"
      className="bg-white w-full rounded-tl-2xl rounded-bl-2xl font-[vazirregular] overflow-auto"
    >
      <div
        dir="rtl"
        className="flex justify-start items-center gap-2 px-10 pb-2 pt-4 border-b border-gray-100 "
      >
        <div className=" w-[72px] h-[72px] relative rounded-full">
          {data && data?.user?.image ? (
            <Image
              src={data.user.image}
              alt={data.user.name}
              fill
              className="object-cover rounded-full"
              sizes="256px"
            />
          ) : (
            <PiUserCircleThin className="w-[72px] h-[72px] text-gray-300" />
          )}
        </div>
        <div className="flex flex-col gap-1 justify-center items-start">
          <h1 className="text-base sm:text-sm text-gray-600">
            {data?.user.name}
          </h1>
          <Link
            href={"/profile"}
            onClick={() => dispatch(notShowList())}
            className="px-2 py-1 text-base sm:text-xs bg-gray-100 text-zinc-600 rounded-full"
          >
            ویرایش حساب کاربری
          </Link>
        </div>
      </div>
      <div
        dir="rtl"
        className="py-4  pr-10 flex flex-col gap-0.5 border-b border-gray-100"
      >
        <Link
          onClick={() => dispatch(notShowList())}
          href="/dashboard"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/dashboard" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <AiOutlineDashboard className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">پیشخوان</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/" && "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <GoHome className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">صفحه اصلی</h3>
        </Link>

        <Link
          onClick={() => dispatch(notShowList())}
          href="/reserves"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/reserves" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <TbReservedLine className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">رزرو ها</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/myrooms"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/rooms" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <BsHouses className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">اقامتگاه ها</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/comments" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <FaRegComments className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">نظر ها</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/chats" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <AiOutlineComment className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">گفتگو ها</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/newroom"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/newroom" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <MdOutlineAddHome className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">ثبت اقامتگاه</h3>
        </Link>

        <Link
          onClick={() => dispatch(notShowList())}
          href="/favorites"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/favorites" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <GoHeart className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">علاقه‌مندی ها</h3>
        </Link>
      </div>
      <div
        dir="rtl"
        className="py-4  pr-10 flex flex-col gap-0.5 border-b border-gray-100"
      >
        <Link
          onClick={() => dispatch(notShowList())}
          href="/profile"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/profile" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <FaRegUser className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">حساب کاربری</h3>
        </Link>

        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/support" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <BiSupport className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">پشتیبانی</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/faq" && "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <TbHomeQuestion className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">سوالات متداول</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/help" && "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <BsQuestionCircle className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">راهنما</h3>
        </Link>

        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/rules" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <AiOutlineSafetyCertificate className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">قوانین وبسایت</h3>
        </Link>
      </div>
      <div dir="rtl" className="pt-4 pb-6 pr-10 flex flex-col gap-0.5">
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/invite" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <IoGiftOutline className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">دعوت از دوستان</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/app" && "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <MdOutlineInstallMobile className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">نصب جاجیگا</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/about" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <BsExclamationOctagon className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">درباره ما</h3>
        </Link>
        <div
          className={`flex items-center cursor-pointer py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 
           `}
          onClick={() => {
            signOut();
          }}
        >
          <IoExitOutline className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">خروج</h3>
        </div>
      </div>
      <div className=" flex justify-between items-center gap-2 w-full py-4 px-6 bg-gray-200">
        <Link onClick={() => dispatch(notShowList())} href={"/"}>
          <PiTelegramLogoThin className="w-6 h-6 text-zinc-800 cursor-pointer" />
        </Link>
        <Link onClick={() => dispatch(notShowList())} href={"/"}>
          <PiInstagramLogoThin className="w-6 h-6 text-zinc-800 cursor-pointer" />
        </Link>
        <Link onClick={() => dispatch(notShowList())} href={"/"}>
          <PiTwitterLogoThin className="w-6 h-6 text-zinc-800 cursor-pointer" />
        </Link>
        <Link onClick={() => dispatch(notShowList())} href={"/"}>
          <PiYoutubeLogoThin className="w-6 h-6 text-zinc-800 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default HeaderListContentLoggedIn;
