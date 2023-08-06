import SideBar from "../components/SideBar"
import styles from './AppLayout.module.css'
import Map from '../components/Map'

const AppLayout = () => {
  return (
    <div className={styles.app}>
        <SideBar />
        <Map />
      AppLayout
    </div>
  )
}

export default AppLayout
