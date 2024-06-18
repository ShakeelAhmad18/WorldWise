import styles from '../components/Sidebar.module.css'
import AppNav from './AppNav'
import Logo from './Logo'
import { Outlet } from 'react-router-dom'
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy;copyright {new Date().getFullYear()} by WorldWise Inc.</p>
            </footer>
        </div>
    )
}

export default Sidebar
