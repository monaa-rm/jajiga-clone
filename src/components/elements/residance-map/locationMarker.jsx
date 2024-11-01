"use client"
import L, { Icon } from "leaflet";
import MapMarker from "../../../assets/marker-icon.svg";
import iconRetinaUrl from 'leaflet/dist/images/marker-icon.png';
import iconUrl from "leaflet/dist/images/marker-icon.png"
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import { Marker, Popup, useMapEvent } from "react-leaflet";
import { useState } from "react";
const LocationMarker = ({position}) => {
  //set icon
  const divIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div class="circle-marker"></div>',
    iconSize: [80, 80],
    iconAnchor: [40, 40] // تنظیم نقطه لنگر به مرکز دایره
  });


  //set divicon
  // const divIcon = new Icon({
  //   iconUrl : '/images/locmarker.png',
  //   iconSize:[40,40],
  //   shadowRetinaUrl : iconRetinaUrl
  // })
  //choose location
  // const [locList , setLocList] = useState([])
  // useMapEvent("click",(e) => {
  //   setLocList([e.latlng?.lat , e.latlng?.lng])
  // })
  return (
    <>
      <Marker  position={[position[0], position[1]]} icon={divIcon} >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      </Marker>
    </>
  )
}

export default LocationMarker
