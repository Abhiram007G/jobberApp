import {Link, withRouter} from 'react-router-dom'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
          </Link>
          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <FiLogOut />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                <h1>Home</h1>
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                <h1>Jobs</h1>
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <AiFillHome />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/jobs" className="nav-link">
              <FaSuitcase />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
