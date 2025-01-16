"use client";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "@/store/slices/newRoomSlice";
import { convertHEIC } from "../../../../utils/convertHeic";
import { toast } from "react-toastify";

const ItemType = "ITEM";
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const Item = ({ id, src, index, moveItem, removeItem }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`w-full md:w-[500px] h-52 sm:h-64 relative rounded-xl cursor-copy mb-2`}
      style={{ opacity }}
    >
      {index === 0 ? (
        <div className="pl-3 h-7 text-gray-700 bg-yellow-500 rounded-full flex justify-between gap-2 items-center absolute right-5 top-8 z-10  ">
          <div className="w-7 h-7 rounded-full bg-indigo-50 flex justify-center items-center ">
            1
          </div>
          <span className="text-sm">تصویر اصلی</span>
        </div>
      ) : (
        <div className="w-7 h-7 rounded-full bg-indigo-50 flex justify-center items-center absolute z-10 top-8 right-5 ">
          {index + 1}
        </div>
      )}
      <button
        onClick={() => removeItem(index)}
        className="w-10 h-10 z-10 rounded-lg flex justify-center absolute top-8 left-5 items-center bg-red-600 hover:bg-red-700 transition-all duration-300 "
      >
        <RiDeleteBin6Line className="w-7 h-7 text-white" />
      </button>
      <Image
        src={src}
        alt={`item-${index}`}
        fill
        className="mt-4 object-cover rounded-xl"
      />
    </div>
  );
};

const Container = ({ items }) => {
  const dispatch = useDispatch();
  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, movedItem);
    dispatch(setImages(newItems));
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    dispatch(setImages(newItems));
  };

  return (
    <>
      {items.map((item, index) => (
        <Item
          key={item.id}
          index={index}
          id={item.id}
          src={item.file}
          moveItem={moveItem}
          removeItem={removeItem}
        />
      ))}
    </>
  );
};

const NewroomImages = () => {
  const images = useSelector((store) => store.newRoomSlice.images);

  const dispatch = useDispatch();
  // const handleFileChange = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const newItems = await Promise.all(
  //     files
  //       .filter(async (file) => file?.type.startsWith("image/"))
  //       .map(async (file, index) => {
  //         const base64 = await convertToBase64(file);

  //         return {
  //           id: images.length + index,
  //           file: base64,
  //           name: file?.name,
  //           type: file?.type,
  //         };
  //       })
  //   );
  //   dispatch(setImages([...images, ...newItems]));
  // };
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    toast.warning("ممکن است چند ثانیه طول بکشد");
    const newItems = await Promise.all(
      files
        .filter(
          (file) =>
            file?.type.startsWith("image/") ||
            file.name.endsWith("HEIC") ||
            file.name.endsWith("HEIF")
        ) // فیلتر بر اساس نوع فایل
        .map(async (file, index) => {
          let base64;

          // اگر نوع فایل HEIC باشد، ابتدا آن را به JPEG تبدیل کنید
          if (file?.name.endsWith("HEIC") || file?.name.endsWith("HEIF")) {
            try {
              const convertedBlob = await convertHEIC(file); // تبدیل HEIC به JPEG
              base64 = await convertToBase64(convertedBlob); // تبدیل Blob به base64
            } catch (error) {
              console.error("Error converting HEIC to JPEG:", error.message);
              return null; // اگر خطا وجود داشت، فایل را اضافه نکنید
            }
          } else {
            // برای فایل‌های غیر HEIC، مستقیما به base64 تبدیل کنید
            base64 = await convertToBase64(file);
          }

          return {
            id: images.length + index,
            file: base64,
            name: file?.name,
            type:
              file?.name.endsWith("HEIC") || file?.name.endsWith("HEIF")
                ? "image/jpeg"
                : file?.type,
          };
        })
    );

    // حذف نتایج null از آرایه نهایی
    const filteredItems = newItems.filter((item) => item !== null);
    if (
      filteredItems?.length > 6 ||
      images?.length > 6 ||
      images?.length + filteredItems?.length > 6
    ) {
      toast.warning("تعداد فایل های انتخاب شده زیاد است");
      e.target.files = null;
    } else {
      dispatch(setImages([...images, ...filteredItems]));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg text-gray-800 ">تصاویر اقامتگاه را آپلود کنید.</h1>
      <span className="font-[vazirRegular] text-gray-700 text-sm">
        ارائه تصاویر زیبا و واقعی از اقامتگاه شما می تواند نقش بسیار مهمی در جلب
        نظر میهمانان ایفا نماید. لذا:
      </span>
      <ul className="list-disc list-outside pr-4 font-[vazirRegular] text-sm text-gray-700">
        <li className="leading-9 text-justify">
          6 عکسِ باکیفیت، از پذیرایی، اتاق خواب ها، آشپزخانه، سرویس بهداشتی،
          حیاط و نمای ساختمان آپلود کنید.
        </li>
        <li className="leading-9 text-justify">
          ترجیحاً از تصاویر افقی (Landscape) استفاده کنید.
        </li>
        <li className="leading-9 text-justify">
          از آپلود تصاویر اسکرین شات اجتناب کنید.
        </li>
        <li className="leading-9 text-justify">
          می توانید با گرفتن و کشیدن (Drag) عکسها, تصویر اصلی اقامتگاه و ترتیب
          نمایش تصاویر را به میل خود تغییر دهید..
        </li>
      </ul>
      <DndProvider backend={HTML5Backend}>
        <label
          className="text-sm w-full md:w-[500px] h-36 flex justify-center items-center  bg-white rounded-xl
        border border-dashed cursor-pointer border-gray-300  hover:border-gray-400  "
          htmlFor="fileUpload"
        >
          <input
            type="file"
            multiple
            className="hidden"
            id="fileUpload"
            accept="image/heic, image/heif, image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full ">
              <CiCamera className="w-8 h-8 text-gray-700" />
            </div>
            <div className="pt-2 text-gray-700"> انتخاب تصویر +</div>
          </div>
        </label>
        <Container items={images} />
      </DndProvider>
    </div>
  );
};

export default NewroomImages;
