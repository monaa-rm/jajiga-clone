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
import { TbHomeQuestion } from "react-icons/tb";
import { MdRule } from "react-icons/md";
import { PiGiftThin } from "react-icons/pi";
import { MdOutlineInstallMobile } from "react-icons/md";
import { BsExclamationSquare } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { TbHomePlus } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IoGiftOutline } from "react-icons/io5";
import { BsExclamationOctagon } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { BiSupport } from "react-icons/bi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { notShowList, setShowSignIn } from "@/store/slices/headerListSlice";

const HeaderListContent = () => {
  const pathname = usePathname();
  const [active, setActive] = useState();
  const dispatch = useDispatch();

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
        <div>
          <PiUserCircleThin className="w-[72px] h-[72px] text-gray-300" />
        </div>
        <div
          onClick={() => {
            dispatch(setShowSignIn(true));
            dispatch(notShowList());
          }}
          className="px-3 py-2 cursor-pointer text-sm bg-gray-100 text-zinc-600 rounded-full"
        >
          ورود / ثبت‌نام
        </div>
      </div>
      <div
        dir="rtl"
        className="py-4  pr-10 flex flex-col gap-0.5 border-b border-gray-100"
      >
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
          href="/favorites"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/favorites" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <GoHeart className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">علاقه‌مندی ها</h3>
        </Link>
        <Link
          onClick={() => dispatch(notShowList())}
          href="/"
          className={`flex items-center py-2 pr-2 justify-start hover:bg-gray-100 hover:rounded-tr-full hover:rounded-br-full gap-2 ${
            pathname == "/host" && "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <TbHomePlus className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">میزبان شو</h3>
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
            pathname == "/guarantee" &&
            "bg-gray-100 rounded-tr-full rounded-br-full"
          }`}
        >
          <MdRule className="w-5 h-5 text-zinc-500" />
          <h3 className="  text-zinc-600">ضمانت تحویل</h3>
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

export default HeaderListContent;
