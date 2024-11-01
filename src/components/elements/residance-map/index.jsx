"use client";
import L from "leaflet";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import LocationMarker from "./locationMarker";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import "react-leaflet-fullscreen/styles.css";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
const ResidanceMap = ({ showModal, isModalOpen, setIsModalOpen  , position}) => {

  return (
    <div
      className={`${
        showModal ? "w-full sm:w-[90%] h-[90%] z-[401]" : "z-0 w-full h-52"
      } rounded-2xl overflow-hidden relative`}
    >
      <div
        onClick={() =>
          isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
        }
        className={`${
          !showModal ? "z-[402]" : "z-[403]"
        }  absolute bottom-24 right-[10px] cursor-pointer p-1 border-2 border-black border-opacity-[0.2] bg-[#f7f7f7] hover:bg-[#e2e2e2] rounded-md`}
      >
        {isModalOpen ? (
          <MdFullscreenExit className=" w-5 h-5  text-[#6d6d6d]" />
        ) : (
          <MdFullscreen className=" w-5 h-5  text-[#6d6d6d]" />
        )}
      </div>
      <MapContainer
        zoomControl={false}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        center={position}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default ResidanceMap;
