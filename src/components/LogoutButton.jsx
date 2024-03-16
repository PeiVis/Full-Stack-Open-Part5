const RemoveUserButton = ({ user, setNotification, setNotificationType }) => {
  const handleLogout = () => {
    setNotification(
      `${user.name} logged out`
    )
    setNotificationType('success')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    window.localStorage.removeItem('user')
    window.location.reload()
  }
  return (
    <button id="logoutButton" onClick={handleLogout}>
      Logout
    </button>
  )
}
export default RemoveUserButton
