"use client";

import { useRef, useState } from "react";
import Slider from "react-slick";
import { MdOutlineArrowForwardIos, MdOutlineDone } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { fastsearch, infoSliderItems } from "../../../../utils/constants";
import { RxShare1 } from "react-icons/rx";
import Link from "next/link";
import copy from "clipboard-copy";

const InfoSlider = () => {
  var settings = {
    dots: false,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    infinite: true,
    speed: 1000,
    arrows: false,
    rtl: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      }, 
    ],
  };

  return (
    <div dir="rtl" className={`py-8 xl:py-0 xl:pb-4 px-0 xl:px-28 `}>
      <Slider currentSlide={0} rtl={false} {...settings}>
        {infoSliderItems.map((item, i) => (
          <div dir="rtl" key={i} className="p-2 flex justify-center">
            <div className="w-full py-2 px-4 h-20 rounded-xl border flex gap-4 items-center justify-start">
              <div className="w-12 h-12 ">{item.svg}</div>
              <div>
                <h1 className="text-gray-800">{item.title}</h1>
                <span className="text-xs text-gray-500">
                  {item.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InfoSlider;
