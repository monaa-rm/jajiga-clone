"use client";
import React, { useEffect, useState } from "react";
import {
  PiHeart,
  PiShareNetworkBold,
  PiShareNetworkLight,
} from "react-icons/pi";
import { RiHeartLine, RiHomeHeartLine } from "react-icons/ri";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

const ResidanceNav = ({showNav, setShowNav}) => {
  const points = [
    { point: "تصاویر", poinLink: "images" },
    { point: "مشخصات", poinLink: "details" },
    { point: "نرخ", poinLink: "price" },
    { point: "مقررات", poinLink: "rules" },
    { point: "نقشه", poinLink: "map" },
    { point: "نظرات", poinLink: "comments" },
  ];
  useEffect(() => {
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("begin", to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register("end", (to, element) => {
      console.log("end", to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);
  const handleSetActive = (to) => {
    console.log(to);
  };

  return (
    <div
      id="navResidance"
      className={`z-[650] w-2/3 pr-3 pl-8 hidden lg:block xl:pl-16 xl:pr-24 fixed transition-all duration-700 ${
        showNav ? "top-0 " : " -top-12"
      } right-5 
    `}
    >
      <div className=" w-full  text-xs  text-white py-3 px-5 flex justify-between items-center
       gap-5 bg-zinc-700   bg-opacity-90 rounded-br-2xl rounded-bl-2xl transition-all duration-500 ">
        <div className="flex justify-start items-center gap-5">
          {points.map((item, i) => (
            <Link
              key={i}
              activeClass="active"
              activeStyle={{background : "rgb(234, 179, 8)", borderRadius: "35px",
               padding:"2px 12px", color:"black"}}
              to={item.poinLink}
              spy={true}
              smooth={true}
              offset={50}
              duration={200}
              onSetActive={handleSetActive}
              className="px-3 py-05"
            >
              {item.point}
            </Link>
          ))}
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white hover:bg-gray-200 flex items-center justify-center ">
            <PiHeart className="w-5 h-5 text-gray-800" />
          </div>
          <div className="w-6 h-6 rounded-md bg-white hover:bg-gray-200 flex items-center justify-center">
            <PiShareNetworkLight className="w-5 h-5 text-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidanceNav;
