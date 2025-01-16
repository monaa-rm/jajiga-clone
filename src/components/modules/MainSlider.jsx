"use client";

import { useRef, useState } from "react";
import Slider from "react-slick";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

import MainSliderItem from "../elements/main-slider-item";
import SliderLastItem from "../elements/slider-last-item";

const MainSlider = ({ items, excelent_num, title, q, discount }) => {
  const [showArrow, setShowArrow] = useState(-1);
  const [currentSlide, setCurrentSlide] = useState({
    oldIndex: null,
    newIndex: null,
  });

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickPrev();
  };
  const previous = () => {
    sliderRef.slickNext();
  };
  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    // rtl: true,
    speed: 300,
    arrows: false,
    initialSlide: items?.length - 1,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide({ oldIndex, newIndex });
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      dir="rtl"
      className={`px-0 relative`}
      onMouseOver={() => setShowArrow(1)}
      onMouseLeave={() => setShowArrow(-1)}
    >
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {items?.length &&
          items?.map((item, i) =>
            i == items?.length - 1 ? (
              <SliderLastItem
                key={i}
                item={item}
                excelent_num={excelent_num}
                title={title}
                q={q}
              />
            ) : (
              <MainSliderItem key={i} item={item} i={i} discount={discount} />
            )
          )}
      </Slider>
      <div className={` hidden xl:block overflow-hidden`}>
        <button
          disabled={
            currentSlide.newIndex == items?.length - 3 ||
            currentSlide.newIndex == null
              ? true
              : false
          }
          className={`absolute ${
            showArrow == 1
              ? "-right-10"
              : "-right-[4rem] bg-white border-white text-white  bg-opacity-0 text-opacity-0 border-opacity-0"
          }
      ${
        showArrow == 1 &&
        (currentSlide.newIndex == items?.length - 3 ||
          currentSlide.newIndex == null)
          ? "cursor-not-allowed hover:bg-gray-50 hover:bg-opacity-20 bg-opacity-20 text-gray-300 "
          : "cursor-pointer  active:border-4  text-gray-600 hover:text-gray-700  active:border-gray-200 hover:bg-gray-300"
      }
       transition-all  duration-500 ease-in-out outline-none bg-gray-50 border-2 border-transparent rounded-full w-10 h-10 flex pl-2 items-center justify-center m-auto inset-y-0 `}
          onClick={previous}
        >
          <MdOutlineArrowForwardIos className="text-2xl" />
        </button>
        <button
          disabled={currentSlide.newIndex == 0 ? true : false}
          className={`absolute ${
            showArrow == 1
              ? "-left-10 "
              : "-left-[4rem] bg-white border-white text-white bg-opacity-0 text-opacity-0 border-opacity-0"
          }  ${
            showArrow == 1 && currentSlide.newIndex == 0
              ? "cursor-not-allowed hover:bg-gray-50 hover:bg-opacity-20 bg-opacity-20 text-gray-300 "
              : "cursor-pointer active:border-4  text-gray-600 hover:text-gray-700  active:border-gray-200 hover:bg-gray-300"
          } transition-all  duration-500 ease-in-out outline-none bg-gray-50  border-2 border-transparent rounded-full w-10 h-10 pl-[2px] flex items-center justify-center  m-auto inset-y-0 `}
          onClick={next}
        >
          <MdArrowBackIos className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default MainSlider;
