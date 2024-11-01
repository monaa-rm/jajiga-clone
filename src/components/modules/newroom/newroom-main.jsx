"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import NewroomAddress from "./newroom-address";
import dynamic from 'next/dynamic';
const DynamicNewroomMap = dynamic(() => import("./newroom-map"), {
  ssr: false,
});
import NewroomImages from "./newroom-images";
import NewroomAbout from "./newroom-about";
import NewroomArea from "./newroom-area";
import NewroomCapacity from "./newroom-capacity";
import NewroomBedroom from "./newroom-bedroom";
import NewroomOptions from "./newroom-options";
import NewroomCheckTime from "./newroom-checktime";
import NewroomCost from "./newroom-cost";
import NewroomRules from "./newroom-rules";
const itemsDetail = [
    { name: "address", title: "آدرس" },
    { name: "map", title: "نقشه" },
    { name: "images", title: "تصاویر اقامتگاه" },
    { name: "about", title: "درباره اقامتگاه" },
    { name: "area", title: "فضای اقامتگاه" },
    { name: "capacity", title: "ظرفیت اقامتگاه" },
    { name: "bedroom", title: "فضای خواب" },
    { name: "options", title: "امکانات" },
    { name: "checktime", title: "ساعت تحویل و تخلیه" },
    { name: "price", title: "اجاره بها" },
    { name: "rules", title: "مقررات اقامتگاه" },
  ];
const NewroomMain = ({itemsDetail}) => {
    const [currentComponent , setCurrentComponent] = useState(<NewroomAddress />)
    const activeItem = useSelector((store) => store.newRoomSlice.activeItem);
    useEffect(() => {
        const selectedComponent = () => {
            switch(activeItem){
                case 0: setCurrentComponent(<NewroomAddress />)
                break;
                case 1: setCurrentComponent(<DynamicNewroomMap />)
                break;
                case 2: setCurrentComponent(<NewroomImages />)
                break;
                case 3: setCurrentComponent(<NewroomAbout />)
                break;
                case 4: setCurrentComponent(<NewroomArea />)
                break;
                case 5: setCurrentComponent(<NewroomCapacity />)
                break;
                case 6: setCurrentComponent(<NewroomBedroom />)
                break;
                case 7: setCurrentComponent(<NewroomOptions />)
                break;
                case 8: setCurrentComponent(<NewroomCheckTime />)
                break;
                case 9: setCurrentComponent(<NewroomCost />)
                break;
                case 10: setCurrentComponent(<NewroomRules />)
                break;
                default:setCurrentComponent(<NewroomAddress />)
            }
        }
        selectedComponent()
    },[activeItem])
    return (
    <div className="w-full p-4 font-[vazirRegular]">
      {currentComponent}
    </div>
  )
}

export default NewroomMain
