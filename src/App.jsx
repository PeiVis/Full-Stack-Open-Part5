import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import AllBlogs from './components/AllBlogs'
import LogoutButton from './components/LogoutButton'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
const App = () => {
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')
  const [user, setUser] = useState(null)
  const createBlogFormRef = useRef()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  const sortBlogs = (blogs) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  const createBlog = async ({ title, author, url }) => {
    const addedBlog = await blogService.create({
      title, author, url
    })
    createBlogFormRef.current.toggleVisibility()
    setBlogs(sortBlogs(blogs.concat(addedBlog)))
    return addedBlog
  }

  const likeBlog = async ({ blogId, title, author, url, likes, user }) => {
    const likedBlog = await blogService.like(blogId, {
      title, author, url, likes, user
    })
    setBlogs(sortBlogs(blogs.map(blog => blog.id === blogId ? likedBlog : blog)))
    return likedBlog
  }

  const deleteBlog = async (blogId) => {
    await blogService.deleteBlog(blogId)
    setBlogs(sortBlogs(blogs.filter(blog => blog.id !== blogId)))
  }

  const login = async (username, password) => {
    const user = await loginService.login({
      username, password
    })
    setUser(user)
    return user
  }

  const loginForm = () => (

    <LoginForm
      login={login}
      setNotification={setNotification}
      setNotificationType={setNotificationType}
      setUser={setUser}
    />

  )

  const createBlogFrom = () => (
    <Togglable buttonLabel='New blog' ref={createBlogFormRef}>
      <CreateBlogForm
        setNotification={setNotification}
        setNotificationType={setNotificationType}
        createBlog= {createBlog}
      />
    </Togglable>
  )

  const allBlogs = () => (
    <AllBlogs
      blogs={blogs}
      deleteBlog={deleteBlog}
      likeBlog={likeBlog}
      user={user}
    />
  )

  const logoutButton = () => (
    <LogoutButton
      user ={user}
      setNotification={setNotification}
      setNotificationType={setNotificationType}
    />
  )

  return (
    <div>
      <Notification
        notification={notification}
        notificationType={notificationType}
      />
      {user === null && loginForm()}
      {user && <div><p>{user.name} logged in {logoutButton()}</p> {createBlogFrom()}</div>}
      {user &&
      <div>
        <p>BLOGS</p>
        {allBlogs()}
      </div>
      }
    </div>
  )
}

export default App
