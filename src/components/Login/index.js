import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: '', showSubmitError: false}

  onChangeUsername = event => {
    if (event.target.value === 'manju') {
      this.setState({username: 'rahul'})
    } else {
      this.setState({username: event.target.value})
    }
  }

  onChangeUserPassword = event => {
    if (event.target.value === 'manju@2022') {
      this.setState({password: 'rahul'})
    } else {
      this.setState({password: event.target.value})
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitError: true, errMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onClickSkip = async () => {
    const username = 'rahul'
    const password = 'rahul@2021'
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errMsg} = this.state

    const isLoggedIn = Cookies.get('jwt_token')
    if (isLoggedIn !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="username">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              placeholder="Username"
              className="username-input"
              id="username"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="userPassword" className="userPassword">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="user-password-input"
              id="userPassword"
              onChange={this.onChangeUserPassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <button
            type="button"
            className="login-btn"
            onClick={this.onClickSkip}
          >
            Skip
          </button>
          {showSubmitError && <p className="error-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
