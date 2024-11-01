"use client";

import { discountCities } from "../../../utils/constants";

const DiscountWrapperSection = ({ children, title ,selectedCity, setSelectedCity}) => {
  return (
    <section className="flex flex-col gap-3  overflow-hidden pb-4 px-1 py-4 xl:px-28 discount_bg rounded-tr-2xl rounded-tl-2xl">
      <div className="flex flex-col py-4 xl:flex-row gap-2 items-cene xl:items-center justify-center xl:justify-start">
        <h1 className="text-white pr-2 text-xl pb-4 xl:pb-0 text-center xl:text-right w-full xl:min-w-64 xl:w-64">
          {title}
        </h1>
        <div className="flex gap-2 discount_cities_scrol items-center justify-start px-3  w-[800px] overflow-x-scroll overflow-hidden">
          {
            discountCities.map((city,i) => (
              <span key={i} className={`${city.link == selectedCity ? "rounded-full bg-yellow-500 text-gray-800": "text-white bg-none"} cursor-pointer transition-all duration-300 ease-linear px-3 text-sm`} onClick={() => setSelectedCity(city.link)}>{city.name}</span>
            ))
          }
        </div>
      </div>
      {children}
    </section>
  );
};

export default DiscountWrapperSection;
