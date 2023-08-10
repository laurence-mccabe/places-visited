import styles from './SideBar.module.css'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      
      <AppNav />

      <Outlet /> 

      <footer className={styles.footer}>
        <p className={styles.copyright}> 
        &copy; 2023 Places Visited
        </p>
      </footer>
    </div>
  )
}

export default SideBar
