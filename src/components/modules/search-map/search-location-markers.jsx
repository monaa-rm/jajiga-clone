"use client";
import L, { Icon } from "leaflet";
import MapMarker from "../../../assets/marker-icon.svg";
import iconRetinaUrl from "leaflet/dist/images/marker-icon.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
// import myicon from "/images/gorgan.jpg";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

import { Marker, Popup, useMapEvent } from "react-leaflet";
import { useState } from "react";
import SearchmapResidanceBox from "./searchmap-residance-box";
import { useSelector } from "react-redux";
const SearchLocationMarker = ({ position, data }) => {
  const pointHome = useSelector((store) => store.filterSlice.PointHome);
  //set icon

    // const pointIcon = L.divIcon({
    //   className: 'custom-div-icon',
    //   html: '<div class="circle-marker"></div>',
    //   iconSize: [80, 80],
    //   iconAnchor: [40, 40] // تنظیم نقطه لنگر به مرکز دایره
    // });

  // set divicon
  const divIcon = new Icon({
    iconUrl: "/images/location-marker-blue.png",
    iconSize: [40, 40],
    shadowRetinaUrl: iconRetinaUrl,
  });
  const pointIcon = new Icon({
    iconUrl: "/images/location-marker-yellow.png",
    iconSize: [40, 40],
    shadowRetinaUrl: iconRetinaUrl,
  });

  return (
    <>
      <Marker position={[data?.location[0], data?.location[1]]} icon={pointHome == data._id ? pointIcon : divIcon}>
        <Popup maxWidth="350" minWidth="350">
          <SearchmapResidanceBox data={data} />
        </Popup>
      </Marker>
    </>
  );
};

export default SearchLocationMarker;
