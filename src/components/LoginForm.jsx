import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
const loginForm = ({ setNotification, setNotificationType, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login(username, password)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNotification(
        `${user.name} logged in`
      )
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Wrong credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginButton' type="submit">login</button>
    </form>
  )
}

loginForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default loginForm
