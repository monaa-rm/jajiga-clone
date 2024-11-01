import Image from "next/image";
import Link from "next/link";

const HostPage = () => {
  return (
    <div className="px-3 xl:px-28">
      <div className="host_bg w-full flex flex-col md:flex-row ">
        <div className=" h-36 md:h-52 w-full md:w-1/2 px-4 pt-2 sm:pt-8 pb-4 flex flex-col gap-2 md:gap-4 relative">
          <h2 className="text-center md:text-right text-lg text-gray-800 font-bold">
            میزبان شوید
          </h2>
          <h3 className="text-sm text-gray-700 text-justify">
            میزبانان جاجیگا مردم واقعی هستند که فضای واقعی بیش از نیاز خود را با
            شرایط منصفانه به گردشگران اجاره میدهند و درآمدی شرافتمندانه کسب
            میکنند.
          </h3>
          <Link
            href={"/host"}
            className="py-2 w-28 flex absolute -bottom-[15px] transform -translate-x-1/2 md:translate-x-0  left-1/2 z-20  md:static xl:mt-5 justify-center rounded-full bg-gray-600 text-white text-sm border-2 border-[#ffe666] "
          >
            توضیحات بیشتر
          </Link>
        </div>
        <div className="h-52 w-full md:w-1/2 relative">
          <Image
            src={"/images/host-image.jpg"}
            alt="host-image"
            fill
            className=" object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default HostPage;
