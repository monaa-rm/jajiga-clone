"use client";

import { resetState } from "@/store/slices/newRoomSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const base64ToFile = (base64, fileName, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new File(byteArrays, fileName, { type: contentType });
};

const Endbutton = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const address = useSelector((store) => store.newRoomSlice.address);
  const location = useSelector((store) => store.newRoomSlice.location);
  const about = useSelector((store) => store.newRoomSlice.about);
  const exclusive = useSelector((store) => store.newRoomSlice.exclusive);
  const area = useSelector((store) => store.newRoomSlice.area);
  const region = useSelector((store) => store.newRoomSlice.region);
  const restype = useSelector((store) => store.newRoomSlice.type);
  const yard = useSelector((store) => store.newRoomSlice.yard);
  const capacity = useSelector((store) => store.newRoomSlice.capacity);
  const maxCapacity = useSelector((store) => store.newRoomSlice.maxCapacity);
  const room = useSelector((store) => store.newRoomSlice.room);
  const bed = useSelector((store) => store.newRoomSlice.bed);
  const options = useSelector((store) => store.newRoomSlice.options);
  const checktime = useSelector((store) => store.newRoomSlice.checkTime);
  const price = useSelector((store) => store.newRoomSlice.price);
  const discount = useSelector((store) => store.newRoomSlice.discount);
  const rules = useSelector((store) => store.newRoomSlice.rules);
  const router = useRouter();

  const disabledPeople = useSelector(
    (store) => store.newRoomSlice.disabledPeople
  );
  const images = useSelector((store) => store.newRoomSlice.images);

  const registerResidance = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("address", JSON.stringify(address));
    formData.append("location", JSON.stringify(location));
    formData.append("restype", JSON.stringify(restype));
    formData.append("bed", JSON.stringify(bed));
    formData.append("price", JSON.stringify(price));
    formData.append("rules", JSON.stringify(rules));
    formData.append("options", JSON.stringify(options));
    formData.append("about", JSON.stringify(about));
    formData.append("exclusive", JSON.stringify(exclusive));
    formData.append("disabledPeople", JSON.stringify(disabledPeople));
    formData.append("area", area);
    formData.append("region", JSON.stringify(region));
    formData.append("yard", yard);
    formData.append("capacity", JSON.stringify(capacity));
    formData.append("maxCapacity", JSON.stringify(maxCapacity));
    formData.append("room", JSON.stringify(room));
    formData.append("checktime", JSON.stringify(checktime));
    formData.append("discount", JSON.stringify(discount ?? 0));

    if (Array.isArray(images)) {
      images.forEach((item, index) => {
        if (typeof item.file === "string") {
          // Convert Base64 string back to Blob
          const contentType = item.type; // Use the saved file type
          const myfile = base64ToFile(item.file, item.name, item.type);
          formData.append(`images-${index}`, myfile);
        } else {
          console.error(`images[${index}] is not a valid Base64 string`);
        }
      });
    } else {
      console.error("images is not an array");
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const res = await fetch("/api/newroom", {
        method: "POST",
        body: formData,
      });
      if (res.status == 201) {
        dispatch(resetState());
        toast.success(`اقامتگاه با موفقیت ثبت شد`);
        router.push("/myrooms");
      }else{
        toast.warning("مشکلی پیش آمده است..");
      }
    } catch (error) {
      console.log(error);
      toast.warning("مشکلی پیش آمده است...");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={() => registerResidance()}
      onDoubleClick={() => {
        return;
      }}
      type="button"
      className={`w-24 h-8 rounded-lg flex justify-center items-center
             bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 disabled:cursor-not-allowed 
             disabled:bg-opacity-50 disabled:text-[rgb(51,51,51)]  cursor-pointer
              `}
    >
      {loading ? (
        <Image
          src={"/images/loading.svg"}
          alt="spinner"
          width={32}
          height={32}
          className=""
        />
      ) : (
        "پایان"
      )}
    </button>
  );
};

export default Endbutton;
