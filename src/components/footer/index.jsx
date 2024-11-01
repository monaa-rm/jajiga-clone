"use client";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { discountCities, footerCities } from "../../../utils/constants";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      dir="rtl"
      className={` ${
        !pathname.startsWith("/s") &&  !pathname.startsWith("/myrooms") && pathname != "/newroom"  && pathname != "/profile"
          ? "flex  z-auto flex-col gap-3 xl:px-28 pt-4 rounded-tr-2xl rounded-tl-2xl bg-slate-200 w-full "
          : "hidden"
      }  `}
    >
      {!pathname.startsWith("/s") ? (
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col sm:flex-row md:flex-row-reverse w-full  gap-3">
            <div className="w-full pt-4">
              <h1 className="text-center pb-2 ">نصب اپلیکیشن جاجیگا</h1>
              <div className="flex p-2 gap-2">
                <Link
                  href={"/"}
                  className="w-1/2 h-12 px-3 py-1 bg-black  rounded-lg"
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={"/images/Bazzar.webp"}
                      alt="bazzar"
                      fill
                      className="object-fill z-0 rounded-lg"
                    />
                  </div>
                </Link>
                <Link
                  href={"/"}
                  className="w-1/2 h-12 px-3 py-1 bg-black  rounded-lg"
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={"/images/PlayStore.webp"}
                      alt="PlayStore"
                      fill
                      className="object-fill z-0 rounded-lg"
                    />
                  </div>
                </Link>
              </div>
              <div className="flex p-2 gap-2">
                <Link
                  href={"/"}
                  className="w-1/2 h-12 px-3 py-1 bg-black  rounded-lg"
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={"/images/Myket.webp"}
                      alt="Myket"
                      fill
                      className="object-fill z-0 rounded-lg"
                    />
                  </div>
                </Link>
                <Link
                  href={"/"}
                  className="w-1/2 h-12 px-3 py-1 bg-black  rounded-lg"
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={"/images/WebApp.webp"}
                      alt="WebApp"
                      fill
                      className="object-fill z-0 rounded-lg"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full p-4 ">
              <h1 className="text-center pb-2">لینک های دسترسی</h1>
              <div className="grid grid-cols-2 gap-2 font-[vazirregular]">
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  چگونه میزبان شوم
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  چگونه مهمان شوم
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  قوانین و مقررات
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  قوانین لغو رزرو
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  پشتیبانی
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  ثبت شکایت
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  فرصت های شغلی
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  راهنمای سایت
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  دعوت از دوستان
                </Link>
                <Link
                  href={"/"}
                  className="text-center text-sm text-blue-500 hover:text-rose-600 transition-all duration-300"
                >
                  سوالات متداول
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-3 ">
            <div className="w-full sm:w-1/3 pt-4 ">
              <h1 className="text-center pb-2 ">با ما همراه شوید</h1>
              <div className="flex sm:flex-col items-center p-2 gap-2 lg:gap-4">
                <Link
                  href={"/"}
                  className="w-1/2 sm:w-3/4 md:w-full h-12 px-3 py-1 flex items-center justify-center gap-3 insta_bg  rounded-lg"
                >
                  <span className="font-sans  text-lg text-white">700k</span>
                  <FaInstagram className="w-8 h-8 text-white" />
                </Link>
                <Link
                  href={"/"}
                  className="w-1/2 sm:w-3/4 md:w-full  h-12 px-3 py-1  flex items-center justify-center gap-3  telegram_bg rounded-lg"
                >
                  <span className="font-sans  text-lg text-white">20k</span>
                  <FaTelegramPlane className="w-8 h-8 text-white" />
                </Link>
              </div>
            </div>
            <div className="w-full sm:w-2/3 pt-4">
              <h1 className="text-center pb-2">
                با خیال راحت به جاجیگا اعتماد کنید
              </h1>
              <div className="flex w-full lg:flex-col">
                <div className="flex w-1/2 lg:w-full p-2 pl-0 lg:pl-2 gap-2  lg:gap-4">
                  <Link
                    href={"/"}
                    className="w-full h-16  sm:h-24 px-3 py-1 flex items-center justify-center gap-3 bg-slate-100  rounded-3xl"
                  >
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={"/images/certificate/ecunion.webp"}
                        alt="ecunion"
                        fill
                        className="object-fill z-0 rounded-lg"
                      />
                    </div>
                  </Link>
                  <Link
                    href={"/"}
                    className="w-full h-16  sm:h-24 px-3 py-1 flex items-center justify-center gap-3 bg-slate-100  rounded-3xl"
                  >
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={"/images/certificate/enamad.webp"}
                        alt="enamad"
                        fill
                        className="object-fill z-0 rounded-lg"
                      />
                    </div>
                  </Link>
                </div>
                <div className="flex  w-1/2 lg:w-full p-2 gap-2 lg:gap-4">
                  <Link
                    href={"/"}
                    className="w-full h-16  sm:h-24 px-3 py-1 flex items-center justify-center gap-3 bg-slate-100  rounded-3xl"
                  >
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={"/images/certificate/iwfm.webp"}
                        alt="iwfm"
                        fill
                        className="object-fill z-0 rounded-lg"
                      />
                    </div>
                  </Link>
                  <Link
                    href={"/"}
                    className="w-full h-16  sm:h-24 px-3 py-1 flex items-center justify-center gap-3 bg-slate-100  rounded-3xl"
                  >
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={"/images/certificate/mcth.webp"}
                        alt="mcth"
                        fill
                        className="object-fill z-0 rounded-lg"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={`w-full px-3 py-3 lg:pt-0 flex flex-wrap justify-center gap-1 ${
          !pathname.startsWith("/s") &&  !pathname.startsWith("/myrooms") && pathname != "/newroom"  && pathname != "/profile"
            ? "lg:w-3/4  lg:justify-start lg:-mt-20"
            : "lg:w-full hidden"
        } `}
      >
        {footerCities.map((city, i) => (
          <Link
            href={`/${city.link}`}
            key={i}
            className="w-36 text-gray-600 text-xs py-1.5 shadow-sm pr-3 rounded-full bg-slate-100 border"
          >
            اجاره {city.title}
          </Link>
        ))}
      </div>
      <div
        className={`py-4 bg-slate-300 text-xs text-center rounded-tr-2xl rounded-tl-2xl ${
          !pathname.startsWith("/s") ? "hidden" : "block"
        }  `}
      >
        کلیه حقوق این وبسایت متعلق به شرکت تجارت الکترونیک لوتوس ارمانی میباشد.
      </div>
    </footer>
  );
};

export default Footer;
