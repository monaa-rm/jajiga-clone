"use client";
import L from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import LocationMarker from "@/components/elements/residance-map/locationMarker";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import { GoScreenFull } from "react-icons/go";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import { excelentresidanceinfo } from "../../../../utils/constants";
import SearchLocationMarker from "./search-location-markers";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBounds, setSendBounds } from "@/store/slices/filterSlice";
import {
  setSelectedAlLCities,
  setSelectedCities,
} from "@/store/slices/headerListSlice";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { debounce } from "lodash";

const SearchMap = ({ data }) => {
  const bounds = useSelector((store) => store.filterSlice.bounds);
  const sendBounds = useSelector((store) => store.filterSlice.sendBounds);
  const dispatch = useDispatch();

  const position = [33.548538, 53.2659074];
  const updateBounds = debounce((bnds) => {
    const boundsDetails = {
       ne_lat: bnds?.getNorthEast()?.lat,
       ne_lng: bnds?.getNorthEast()?.lng,
       sw_lat: bnds?.getSouthWest()?.lat,
       sw_lng: bnds?.getSouthWest()?.lng,
    };
    dispatch(setBounds(boundsDetails));
 }, 300);
 const MapEvents = () => {
  useMapEvents({
     moveend: (event) => {
        updateBounds(event.target.getBounds());
     },
  });
  return null;
};

  const handleSearch = async () => {
    if (bounds) {
      dispatch(dispatch(setSelectedAlLCities([])));
      dispatch(setSendBounds(!sendBounds ? -1 : sendBounds * -1));
    }
  };

  return (
    <div className="w-[100%] h-[100%] z-0 relative">
      <div
        onClick={handleSearch}
        className="absolute top-10 left-1/2 transition-all duration-300 -translate-x-1/2 cursor-pointer text-white bg-gray-800 hover:bg-gray-900 shadow-md text-sm rounded-full px-3 py-1 flex gap-2 justify-center items-center z-[750]"
      >
        <FaSearch />
        <span>جستجو در این محدوده</span>
      </div>
      <MapContainer
        center={position}
        style={{ width: "100%", height: "100%", zIndex: "0" }}
        zoom={6}
        scrollWheelZoom={true}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        <MarkerClusterGroup maxClusterRadius={10}>
          {data?.map((item, i) => (
            <SearchLocationMarker key={i} data={item} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default SearchMap;
