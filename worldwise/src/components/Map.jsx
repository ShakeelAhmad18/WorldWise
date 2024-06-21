import { useNavigate } from "react-router-dom"
import styles from "./Map.module.css";
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet'
import { useState } from "react";


function Map() {
  const nevigate = useNavigate();
  const [myPosition,setMyPosition]=useState([45,0])

  setMyPosition
  //const [searchParam, setSearchParam] = useSearchParams();
 // const lat = searchParam.get("lat");
  //const lng = searchParam.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => nevigate("form")}>
      <MapContainer center={myPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={myPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
