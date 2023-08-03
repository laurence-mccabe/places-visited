import { Link } from "react-router-dom"
import PageNav from "../components/PageNav"
import AppNav from "../components/AppNav"

const Homepage = () => {
  return (
    <div>
      <PageNav/>
      <AppNav />
      Homepage
      <Link to="/app"> Go to the app</Link>
    </div>
  )
}

export default Homepage
