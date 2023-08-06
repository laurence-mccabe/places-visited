import styles from './SideBar.module.css'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      {/* <Logo /> */}
      <AppNav />

      <Outlet /> {/*  similar to children prop (but for routes) */}

      <footer className={styles.footer}>
        <p className={styles.copyright}> 
        &copy; 2023 Places Visited
        </p>
      </footer>
    </div>
  )
}

export default SideBar
