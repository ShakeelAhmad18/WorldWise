import { useNavigate } from "react-router-dom"
import styles from "./Map.module.css";
import { MapContainer,TileLayer,Marker,Popup, useMap,useMapEvents } from 'react-leaflet'
import { useContext, useEffect, useState } from "react";
import { CitieContext } from "../context/CitiesContext";
import PropTypes from 'prop-types'
import { useGeolocation } from "../hooks/useGeoLoaction";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";


function Map() {
  const {cities}=useContext(CitieContext)
  const [mapPosition,setMapPosition]=useState([45,0])
  
  const {
    getPosition,
    isLoading:isLoadingPosition,
    position:geolocationPosition}=useGeolocation();

    const [mapLat,mapLng]=useUrlPosition();

  
  useEffect(function(){

    if(mapLat && mapLng)  setMapPosition([mapLat,mapLng])

  },[mapLat,mapLng])




useEffect(function(){
  if(geolocationPosition) 
    setMapPosition([geolocationPosition.lat,geolocationPosition.lng])

},[geolocationPosition])


  return (
    <div className={styles.mapContainer}>
     {!geolocationPosition &&   <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use Your Position'}</Button> }
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
       { cities.map((city)=> <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
          <Popup>
          {city.emoji} {city.cityName}
          </Popup>
        </Marker> )}
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>
    </div>
  );
}



function ChangeCenter({position}){
   const map=useMap()
   map.setView(position)
   return null
}

ChangeCenter.propTypes={
    position:PropTypes.any
}

function DetectClick(){
    const navigate=useNavigate();
    useMapEvents({
        click:(e) =>
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    })
}



export default Map;
