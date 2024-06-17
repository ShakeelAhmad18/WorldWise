import Sidebar from '../components/Sidebar'
import styles from './AppLayout.module.css'
import Map from '../components/Map'
import { Outlet } from 'react-router-dom';
function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar/>
            <Map/>

            <Outlet/>
        </div>
    )
}

export default AppLayout;