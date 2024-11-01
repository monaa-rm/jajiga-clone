import { propertiesActive, setProperties, setTypes, typeActive } from "@/store/slices/filterSlice";
import clipboardCopy from "clipboard-copy";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { RxShare1 } from "react-icons/rx";
import { useDispatch } from "react-redux";

const FastSearchItem = ({ item , itemCount }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [dragCtrl, setDragCtrl] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isCopied) {
      var timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => clearInterval(timeout);
  }, [isCopied]);

  const copyLink = async (e, text) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const link = `${process.env.NEXT_PUBLIC_SERVER_URL}/${text}`;
      await clipboardCopy(link);
      setIsCopied(text);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <div className="p-2 relative ">
      <Link
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
          if (item?.type == "prprty") {
            dispatch(setProperties(item.link));
            dispatch(propertiesActive(true));
          }
          if (item?.type == "typ") {
            dispatch(setTypes(item.link));
            dispatch(typeActive(true));
          }
        }}
        href={`/s`}
        className="w-full h-48 sm:h-52  md:h-72 rounded-lg "
      >
        <div className="relative  w-full h-48 sm:h-52 md:h-72  shadow-[inset_0_-40px_50px_rgb(0,0,0)]  rounded-lg">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover  rounded-lg -z-10 "
            sizes="256px"
          />
        </div>
        <div className="absolute bottom-4 text-white w-full flex flex-col items-center justify-center gap-3">
          <h1>{item.title}</h1>
          <div className="flex justify-between items-center gap-3">
            <RxShare1
              className="font-bold "
              onClick={(e) => copyLink(e, item.link)}
            />
            <span className="text-xs" dir="rtl">
              {itemCount ? itemCount?.count : 0} اقامتگاه
            </span>
          </div>
        </div>
        <div
          className={`py-1 w-28 ${
            isCopied && item.link == isCopied
              ? "flex  bottom-7"
              : "-bottom-10 flex"
          }  text-white bg-gray-950 bg-opacity-90 mx-auto inset-x-0 transition-all duration-300 ease-in-out rounded-md absolute text-sm justify-center `}
        >
          <span>لینک کپی شد </span>
          <MdOutlineDone className="text-xl pl-[2px]" />
        </div>
      </Link>
    </div>
  );
};

export default FastSearchItem;
