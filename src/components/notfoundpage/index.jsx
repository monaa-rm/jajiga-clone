"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";

const NotFoundPage = () => {
  return (
    <div className="p-4 sm:p-8 flex flex-col items-center gap-2 md:gap-3 md:px-12 text-zinc-800 pb-10">
      <h1 className="font-bold text-xl ">متاسفیم</h1>
      <div className="w-full h-48 sm:w-[500px]  md:w-[650px]  sm:h-72 relative">
        <Image
          src={"/images/error404.webp"}
          alt="error404"
          fill
          className="object-contain"
          sizes="500px"
        />
      </div>
      <h1 className="font-bold text-xl ">صفحه مورد نظر شما موچود نیست.</h1>
      <p className="font-thin text-zinc-700">کد خطا: 404</p>
      <p className="font-thin text-zinc-700">
        صفحه ای که درخواست کرده اید وجود ندارد. شما می توانید از لینک های زیر
        برای ورود به قسمت های دیگر سایت استفاده کنید.
      </p>
      <div className="flex justify-center items-center gap-2 md:gap-4">
      <Link
          href={"/"}
          className="flex justify-center items-center gap-2 font-[vazirRegular] px-3 sm:px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
        >
          <GoHome className="text-lg" />
          <span>صفحه اصلی</span>
        </Link>
        <Link
          href={"/s"}
          className="flex justify-center items-center gap-2 font-[vazirRegular] px-3 sm:px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
        >
          <IoIosSearch className="text-lg" />
          <span>جستجو</span>
        </Link>
       
      </div>
    </div>
  );
};

export default NotFoundPage;
