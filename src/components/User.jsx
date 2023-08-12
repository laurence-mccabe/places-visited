import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'
import styles from './User.module.css'

const User = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {isAuthenticated && (
        <div className={styles.user}>
          <img src={user.avatar} alt={user.name} />
          <span>Welcome, {user.name}</span>
          <button onClick={handleClick}>Logout</button>
        </div>
      )}
    </>
  )
  
}

export default User


