"use client"
import L ,{ Icon } from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvent, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import "react-leaflet-fullscreen/styles.css";
import { useDispatch, useSelector } from "react-redux";
import iconRetinaUrl from "leaflet/dist/images/marker-icon.png";
import { setLocation } from "@/store/slices/newRoomSlice";
import { BsExclamationCircle } from 'react-icons/bs';

const NewroomMap = () => {
  const loc = useSelector((store) => store.newRoomSlice.location);
  const defaultPosition = [36.7606283,51.2173113];
  const position = loc && loc.length === 2 ? loc : defaultPosition;

  const dispatch = useDispatch();
  const pointIcon = new Icon({
    iconUrl: "/images/location-marker-yellow.png",
    iconSize: [40, 40],
    shadowRetinaUrl: iconRetinaUrl,
  });
 
  const MapClickHandler = () => {
    useMapEvent("click", (e) => {
      dispatch(setLocation([e.latlng?.lat, e.latlng?.lng]));
    });
    return null;
  };
  return (
    <div className=" flex flex-col gap-3 w-full md:w-[480px] lg:w-[500px]">
      <h3 className='text-lg font-bold text-gray-800'>انتخاب موقعیت در نقشه</h3>
      <p className='w-full text-sm font-[vazirRegular] text-gray-600'>نقشه را حرکت دهید و موقعیت اقامتگاه را مشخص کنید. با استفاده از کلید + بر روی نقشه زوم کنید.</p>
      <div className='w-full p-5 bg-pink-100 shadow shadow-pink-100 rounded-2xl'>
        <div className='flex justify-start items-center gap-4'>
          <BsExclamationCircle className='text-red-800 w-4 h-4' />
          <span className='text-red-800 text-sm font-bold'>موقعیت مکانی (لوکیشن) را به دقت مشخص کنید.</span>
        </div>
        <p className='text-sm text-red-700 mt-2 pr-8 text-justify leading-6'>لوکیشن ثبت شده برای مسیریابی به مهمانان ارسال می‌شود. طبق ضمانت تحویل جاجیگا، هرگونه مغایرت می‌تواند باعث لغو رزرو و عودت وجه به مهمان شود.</p>
      </div>
      <div className="w-full h-64 rounded-lg overflow-hidden relative">
        <MapContainer
          zoomControl={false}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          center={loc.length ? loc : position }
          zoom={5}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
           <MapClickHandler />
          {loc && loc.length === 2 && (
                 <Marker position={position} icon={pointIcon}></Marker>

          )}
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>
    </div>
  );
};

export default NewroomMap;
