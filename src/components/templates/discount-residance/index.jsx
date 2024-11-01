"use client";
import DiscountWrapperSection from "@/components/layout/discount-wrapper-section";

import { useEffect, useState } from "react";
import MainSlider from "@/components/modules/MainSlider";
const DiscountResidance = () => {
  const [selectedCity, setSelectedCity] = useState("all");
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/s/discount`, {
          method: "POST",
          body: JSON.stringify(selectedCity),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        setTotalItems(result.totalItems);
        setData(result.data);
      } catch (error) {
        console.log("مشکلی پیش آمده");
      }
    };
    fetchData();
  }, [selectedCity]);

  return (
    <DiscountWrapperSection
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      title={"تخفیف های سفر انگیز"}
    >
      <MainSlider
        items={data}
        excelent_num={JSON.parse(JSON.stringify(totalItems))}
        discount={true}
        title={"اقامتگاه تخفیف دار همه شهرها"}
        q={"discount"}
      />
    </DiscountWrapperSection>
  );
};

export default DiscountResidance;
