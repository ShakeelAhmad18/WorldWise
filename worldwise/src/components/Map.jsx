import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
   const nevigate=useNavigate()
    const [searchParam,setSearchParam]=useSearchParams();
   const lat=searchParam.get('lat')
   const lng=searchParam.get("lng")
    return (
        <div className={styles.mapContainer} onClick={()=>nevigate("form")}> 
            Poition: {lat} , {lng}
            <button onClick={()=>setSearchParam({lat:23,lng:46})}>Position Change</button>
        </div>
    )
}

export default Map
