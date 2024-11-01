import LocationIcon from "@/components/elements/location-icon";
import Link from "next/link";

const MapSection = () => {
  return (
    <div className="px-4 xl:hidden">
      <Link
        href={"/map"}
        className="relative flex justify-between bg-[url('/images/map1.jpg')] items-start rounded-2xl w-full shadow-[0px_4px_7px_7px_rgba(0,0,0,0.1)] h-40 "
      >
        <div className="w-full flex flex-col gap-1 sm:gap-3 items-center justify-start sm:justify-center sm:items-start sm:w-1/2 p-2 sm:p-4 bg-white rounded-2xl h-1/2 sm:h-full">
          <h1 className="text-lg text-gray-700">اقامتگاه های اطراف من</h1>
          <span className="text-sm hidden sm:flex text-gray-600">
            هرکجا که هستی میتونی تمام اقامتگاه های اطرافت رو تو نقشه ببینی
          </span>
          <span className="text-xs flex sm:hidden text-gray-600">
            اقامتگاه های نزدیک رو در نقشه پیدا کن
          </span>
        </div>
        <div className="absolute top-16 sm:top-24 left-1/2 sm:left-1/4 transform -translate-x-1/2 text-gray-600 py-1 px-4 border-4 border-opacity-0 bg-yellow-400 rounded-full ">
          بزن بریم
        </div>
        <LocationIcon />
      </Link>
    </div>
  );
};

export default MapSection;
