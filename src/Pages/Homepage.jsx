import PageNav from '../components/PageNav'
import styles from './Homepage.module.css'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Travel, or find places you like.
          <br />
          Places visited will keep track of them.
        </h1>
        <h2>
          An app which allows you to keep track of places you have visited.
        </h2>
        <Link to="/app" className="cta">
          Start Tracking now{' '}
        </Link>
      </section>
    </main>
  )
}
