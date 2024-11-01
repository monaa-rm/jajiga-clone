"use client";

import { useRef, useState } from "react";
import Slider from "react-slick";
import { MdOutlineArrowForwardIos, MdOutlineDone } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { fastsearch } from "../../../utils/constants";

import FastSearchItem from "../elements/fast-search-item";

const FastSearchSlider = ({ItemsCount}) => {
  const [showArrow, setShowArrow] = useState(-1);

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 4,
    speed: 500,
    arrows: false,
    rtl: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div
      className={`px-0 relative`}
      onMouseOver={() => setShowArrow(1)}
      onMouseLeave={() => setShowArrow(-1)}
    >
      <Slider
        currentSlide={0}
        rtl={true}
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {fastsearch.length &&
          fastsearch.map((item, i) => <FastSearchItem key={i} item={item} itemCount={ItemsCount.find(itm => itm.name == item.link  )} />)}
      </Slider>
      <div className={` hidden xl:block overflow-hidden`}>
        <button
          className={`absolute ${
            showArrow == 1
              ? "-right-10"
              : "-right-[4rem] bg-white border-white text-white"
          }  transition-all duration-500 ease-in-out outline-none bg-gray-50 border-2 border-transparent active:border-4 active:border-gray-200 hover:bg-gray-300 rounded-full text-gray-600 hover:text-gray-700 w-10 h-10 flex items-center justify-center m-auto inset-y-0 `}
          onClick={previous}
        >
          <MdOutlineArrowForwardIos className="text-2xl" />
        </button>
        <button
          className={`absolute ${
            showArrow == 1
              ? "-left-10"
              : "-left-[4rem] bg-white border-white text-white"
          }  transition-all duration-500 ease-in-out outline-none bg-gray-50 border-2 border-transparent active:border-4  active:border-gray-200 hover:bg-gray-300 rounded-full text-gray-600 hover:text-gray-700  w-10 h-10 pr-1 flex items-center justify-between  m-auto inset-y-0 `}
          onClick={next}
        >
          <MdArrowBackIos className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default FastSearchSlider;
