"use client";

import Image from "next/image";
import CropImageComponent from "./CropImageComponent";
import { useEffect, useState } from "react";
import "react-easy-crop/react-easy-crop.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { getCroppedImg } from "./getCroppedImg";
import { useSession } from "next-auth/react";
const SelectProfileImage = ({ showImageBox, setShowImageBox }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filename, setFilename] = useState("croppedImage.jpg");
  const [croppedImage, setCroppedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { data: session, status, update } = useSession()
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#selectImage")) {
        setShowImageBox(false);
        setSelectedImage(null);
        setCroppedAreaPixels(null);
        setCroppedImage(null);
        setRotation(0);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const userImageHandler = async () => {
    setShowImageBox(false);
    if (!selectedImage) {
      console.error("No image to upload");
      return;
    }

    try {
      const croppedBuffer = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      ); // دریافت تصویر کراپ شده
      const formData = new FormData();

      formData.append(
        "user-image",
        new Blob([croppedBuffer], { type: "image/jpeg" }),
        filename
      );

      const res = await fetch("/api/auth/userImage", {
        method: "PATCH",
        body: formData,
      });

      if (res.status === 200) {
        const data = await res.json();
        await update({image : data.data})
        setSelectedImage(null);
        setCroppedAreaPixels(null);
        setCroppedImage(null);
        setRotation(0);
      } else {
        console.error("Failed to upload image", res);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div
      id="selectImage"
      className={` bg-white profileboxheight md:h-auto overflow-hidden  rounded-tr-2xl rounded-tl-2xl md:rounded-2xl fixed
   left-0 right-0 md:left-1/2 md:right-auto pb-20 md:-translate-x-1/2 bottom-0 md:w-[500px] shadow-md md:bottom-auto z-[701] transition-all duration-300 ${
     showImageBox ? "top-24 md:top-28 " : "top-full "
   }  `}
    >
      <div className="flex flex-col gap-4 items-center justify-start py-4 ">
        <div className="flex justify-between items-center gap-4 px-3 w-full">
          <div className="text-xl text-gray-800">ویرایش عکس</div>
          {selectedImage && !croppedImage ? (
            <RiDeleteBack2Fill
              className="w-6 h-6 text-gray-700 text-opacity-70 hover:text-opacity-90 transition-all duration-300
       cursor-pointer"
              onClick={() => setSelectedImage(null)}
            />
          ) : null}
        </div>
        {selectedImage ? null : (
          <>
            <div className="w-28 h-28">
              {" "}
              <svg
                className="sc-679cb2a8-0 iBzALU sc-b758a883-0 klwIQK"
                fill="currentColor"
                viewBox="0 0 134.58 138.86"
                preserveAspectRatio="xMidYMid meet"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      d="M65.86,128c31.19,0,56.5-25.5,56.5-57S97.05,14,65.86,14,9.36,39.5,9.36,71,34.67,128,65.86,128Zm0,2c32.31,0,58.5-26.42,58.5-59S98.17,12,65.86,12,7.36,38.42,7.36,71,33.55,130,65.86,130Z"
                      style={{ fill: "rgb(50,50,50)", fillRule: "evenodd" }}
                    ></path>
                    <path
                      d="M41.63,89.13a34.42,34.42,0,0,1,58.76,24.34,1,1,0,0,1-2,0,32.43,32.43,0,0,0-64.85,0,1,1,0,0,1-2,0A34.4,34.4,0,0,1,41.63,89.13Z"
                      style={{ fill: "rgb(50,50,50)", fillRule: "evenodd" }}
                    ></path>
                    <path
                      d="M116.11,71.25a50,50,0,0,1-15.26,36,35.43,35.43,0,0,0-69.76,0,50.14,50.14,0,1,1,85-36Zm-27.92,20a31.46,31.46,0,0,1,9.06,19.18,50.15,50.15,0,0,1-62.56,0,31.42,31.42,0,0,1,53.5-19.18ZM76.8,60.69A10.83,10.83,0,1,1,66,49.86,10.83,10.83,0,0,1,76.8,60.69Zm5,0A15.83,15.83,0,1,1,66,44.86,15.83,15.83,0,0,1,81.8,60.69Z"
                      style={{ fill: "rgb(238,238,238)", fillRule: "evenodd" }}
                    ></path>
                    <path
                      d="M65.86,74.26a13.5,13.5,0,1,0-13.5-13.5A13.49,13.49,0,0,0,65.86,74.26Zm0,2a15.5,15.5,0,1,0-15.5-15.5A15.5,15.5,0,0,0,65.86,76.26Z"
                      style={{ fill: "rgb(50,50,50)", fillRule: "evenodd" }}
                    ></path>
                    <path
                      d="M65.86,71a1,1,0,0,0,1,1,11.5,11.5,0,0,0,0-22.92,1,1,0,0,0-1,1Z"
                      style={{ fill: "rgb(240,200,7)" }}
                    ></path>
                    <path
                      d="M65.86,121.38V85.5a1,1,0,0,1,1-1A35.05,35.05,0,0,1,77.15,87a29.89,29.89,0,0,1,9.57,5.74,26.57,26.57,0,0,1,6.4,8.6,24.19,24.19,0,0,1,2.24,10.14v.37A49.87,49.87,0,0,1,66,121.38Z"
                      style={{ fill: "rgb(240,200,7)", fillRule: "evenodd" }}
                    ></path>
                    <path
                      d="M43.76,20.65a54.41,54.41,0,0,1,64.62,15.89c7.38,9.34,12.48,20.93,12.48,33a1.5,1.5,0,0,1-3,0c0-11.19-4.75-22.15-11.83-31.1a51.32,51.32,0,0,0-85.35,7.47A1.5,1.5,0,1,1,18,44.46,53.85,53.85,0,0,1,43.76,20.65Z"
                      style={{ fill: "rgb(240,200,7)", fillRule: "evenodd" }}
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <span className="font-[vazirRegular] text-gray-600 text-sm ">
              تصویر واضحی از چهره ی خود آپلود کنید
            </span>

            <label
              htmlFor="profileInput"
              className="px-4 py-2 cursor-pointer bg-zinc-700 rounded-full text-white font-[vazirRegular] flex justify-center items-center gap-2"
            >
              <AiOutlineCloudUpload className="w-6 h-6" />
              <span>انتخاب تصویر</span>
            </label>

            <input
              id="profileInput"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </>
        )}

        {selectedImage && !croppedImage && (
          <CropImageComponent
            rotation={rotation}
            setRotation={setRotation}
            croppedAreaPixels={croppedAreaPixels}
            setCroppedAreaPixels={setCroppedAreaPixels}
            imageSrc={selectedImage}
            onCropComplete={(croppedImg) => setCroppedImage(croppedImg)}
            croppedImage={croppedImage}
          />
        )}
        {croppedImage && (
          <div className="flex flex-col  py-3 justify-start items-center">
            <div className="w-36 h-36 rounded-full relative">
              <Image
                fill
                className="object-cover rounded-full"
                src={URL.createObjectURL(croppedImage)}
                alt="Cropped Image"
              />
            </div>
            <button
              onClick={() => {
                setCroppedImage(null);
                setSelectedImage(null);
              }}
              className="mt-4 px-4 font-[vazirRegular] py-2 flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-all duration-300 text-gray-700 rounded"
            >
              <MdOutlineEdit className="w-5 h-5 " />
              <span>تغییر تصویر</span>
            </button>
          </div>
        )}
        <div className=" absolute bottom-8 w-full mt-3 px-3">
          <div
            className={`${
              croppedImage && "hidden"
            } top-0 right-0 bottom-0 left-0 absolute bg-white bg-opacity-70`}
          ></div>
          <button
            onClick={userImageHandler}
            className={` rounded-xl w-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 flex justify-center items-center py-2 `}
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectProfileImage;
