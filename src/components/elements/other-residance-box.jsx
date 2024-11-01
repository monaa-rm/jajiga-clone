import {
  formatNumberToPersian,
  otherUserRedidances,
} from "../../../utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";

const OtherResidanceBox = ({ userOtherResidances }) => {
  const [dragCtrl, setDragCtrl] = useState(false);
  var settings = {
    dots: false,
    slidesToShow: 2,
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
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <Slider currentSlide={0} rtl={true} {...settings}>
      {userOtherResidances?.map((item, i) => (
        <Link
          dir="rtl"
          href={`/${item._id}`}
          key={i}
          draggable={false}
          onMouseMove={(e) => {
            e.preventDefault();
            setDragCtrl(true);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragCtrl(false);
          }}
          onClick={(e) => {
            if (dragCtrl) {
              e.preventDefault();
            }
          }}
          className="h-40  w-full"
        >
          <div className="w-full h-full flex p-2 justify-start items-center gap-2">
            <div className="w-24 min-w-24 h-24 rounded-md relative">
              <Image
                src={item.images[0]}
                alt="image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start justify-center">
              <h3 className="line-clamp-1 text-gray-700 w-full">
                {" "}
                اجاره {item.type_residance.title} در {item.address.city.name}
              </h3>
              <div className=" flex gap-[2px] text-xs text-gray-500">
                <span> {item.room} خوابه </span>
                <span>.</span>
                <span>{item.area} متر </span>
                <span>.</span>
                <span>تا {item.maxCapacity} مهمان</span>
              </div>
              <h5 className="text-gray-700 text-sm">
                هر شب از{" "}
                {item.price.holidays > item.price.notHolidays
                  ? formatNumberToPersian(item.price.notHolidays)
                  : formatNumberToPersian(item.price.holidays)}{" "}
                تومان
              </h5>
            </div>
          </div>
        </Link>
      ))}
    </Slider>
  );
};

export default OtherResidanceBox;
