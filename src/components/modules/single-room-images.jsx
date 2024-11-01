"use client";
import Image from "next/image";
import Slider from "react-slick";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Element } from "react-scroll";
import Likeresidance from "../elements/Likeresidance";

const SingleRoomImages = ({ images , userData ,residanceId }) => {
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (showAll) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showAll]);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#resImageSliderId")) {
        setShowAll(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showAll]);
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    rtl: true,
    initialSlide: 0,
  };
  return (
    <Element name="images" className="w-full ">
      <Likeresidance userData={userData} residanceId={residanceId}/>
      <div
        className={`hidden ${
          showAll ? "sm:block" : "sm:hidden"
        } fixed left-5 top-3 cursor-pointer z-[601] `}
      >

        <LiaTimesSolid
          className="w-8 h-8 text-white transition-all duration-300 hover:text-gray-100"
          onClick={() => setShowAll(false)}
        />
      </div>
      <div
        className={`block sm:${
          showAll
            ? "flex justify-center items-center fixed top-0 h-screen right-0 left-0 bottom-0 z-[710] bg-black bg-opacity-80"
            : "hidden"
        } singleroom`}
      >
        <div className=" w-auto h-auto md:w-5/6 ">
          <Slider {...settings} id="resImageSliderId">
            {images.map((image, i) => (
              <div
                key={i}
                className={` ${
                  showAll ? "w-full h-full pt-16 " : "w-full h-96"
                } `}
              >
                <div
                  className={`${
                    showAll
                      ? "h-[550px] w-[700px] rounded-2xl mx-auto"
                      : "w-full h-96"
                  } relative`}
                >
                  <Image
                    src={image}
                    alt="image"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="hidden sm:flex justify-center items-center gap-2 h-80 w-full">
        <div className="w-1/2 h-full rounded-lg relative cursor-pointer">
          <Image
            src={images[0]}
            alt="image"
            fill
            className="object-cover rounded-lg  transition-all duration-75"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2 h-full">
          <div className="flex w-full h-1/2 gap-2">
            <div className="w-1/2 h-full bg-slate-600 rounded-lg relative cursor-pointer">
              <Image
                src={images[1]}
                alt="image"
                fill
                className="object-cover rounded-lg  transition-all duration-75"
              />{" "}
            </div>
            <div className="w-1/2 h-full rounded-lg relative cursor-pointer">
              <Image
                src={images[2]}
                alt="image"
                fill
                className="object-cover rounded-lg  transition-all duration-75"
              />
            </div>
          </div>
          <div className="flex w-full h-1/2 gap-2 ">
            <div className="w-1/2 h-full rounded-lg relative cursor-pointer ">
              <Image
                src={images[3]}
                alt="image"
                fill
                className="object-cover rounded-lg  transition-all duration-75"
              />{" "}
            </div>
            <div
              className="w-1/2 h-full rounded-lg relative cursor-pointer"
              onClick={() => setShowAll(true)}
            >
              <Image
                src={images[4]}
                alt="image"
                fill
                className="object-cover rounded-lg    opacity-50 transition-all duration-75"
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 z-[1] text-gray-700 flex justify-center items-center w-32 py-2 bg-white rounded-full gap-1 hover:bg-gray-200 transition-all duration-300 ">
                <CiImageOn className="w-6 h-6" />
                <span className="text-sm">مشاهده بیشتر</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default SingleRoomImages;
