"use client"

import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6"

const LocationIcon = () => {
    const [radius, setRadius] = useState(1);

    useEffect(() => {
      const interval = setInterval(() => {
        if (Math.sign(radius) === 1) {
          setRadius((radius) => radius - 2);
        } else {
          setRadius((radius) => radius + 2);
        }
      }, 1500);
  
      return () => clearInterval(interval);
    }, [radius]);
  return (
    <div
    className={`absolute bottom-4 sm:bottom-20 left-1/2 sm:left-1/4 transform -translate-x-1/2 ${radius === 1 ? "scale-150 bg-opacity-0 border-opacity-0" : "scale-100 bg-yellow-400"} transition-all duration-[1500ms]  w-8 h-8 flex justify-center items-center rounded-full  border-2 border-yellow-200`}
  >
    <FaLocationDot className="text-lg " />
  </div>
  )
}

export default LocationIcon
