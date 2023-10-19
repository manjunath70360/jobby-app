import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/" className="name-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="header-names">
        <li>
          <Link to="/" className="name-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="name-link">
            Jobs
          </Link>
        </li>
        <li className="btn-container">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
