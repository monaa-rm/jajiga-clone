"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./getCroppedImg";
import { LuZoomIn } from "react-icons/lu";
import { MdCropRotate } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setUserImage } from "@/store/slices/headerListSlice";
const CropImageComponent = ({
  imageSrc,
  onCropComplete,
  setSelectedImage,
  croppedImage,
  rotation,
  croppedAreaPixels,
  setRotation,
  setCroppedAreaPixels,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const dispatch = useDispatch();
  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((value) => {
    setZoom(value);
  }, []);

  const onRotationChange = useCallback((event) => {
    setRotation(event.target.value);
  }, []);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      onCropComplete(croppedImage);
      
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation, onCropComplete]);

  return (
    <div className="flex flex-col items-center w-full px-3">
      <div className="relative w-full h-64 bg-gray-200 rounded-2xl overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={handleCropComplete}
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-3 mt-3 w-full">
        <div className="flex items-center gap-3 ">
          <label className="text-gray-700 mt-1">
            <LuZoomIn className="w-5 h-5 text-gray-700" />
          </label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e) => onZoomChange(e.target.value)}
            className="w-full mt-2"
          />
        </div>
        <div className="flex items-center gap-3 ">
          <label className="text-gray-700 mt-1">
            <MdCropRotate className="w-5 h-5 text-gray-700" />
          </label>
          <input
            type="range"
            value={rotation}
            min={0}
            max={360}
            step={1}
            onChange={onRotationChange}
            className="w-full mt-2"
          />
        </div>
        <button
          onClick={showCroppedImage}
          className={` rounded-full w-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 flex justify-center items-center py-2 `}
        >
          تایید
        </button>

      </div>
      <div className=" absolute bottom-8 w-full mt-3 px-3">
        <div
          className={`${
            croppedImage && "hidden"
          } top-0 right-0 bottom-0 left-0 absolute bg-white bg-opacity-70`}
        ></div>
        <button
          className={` rounded-xl w-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 flex justify-center items-center py-2 `}
        >
          ذخیره
        </button>
      </div>
    </div>
  );
};

export default CropImageComponent;
