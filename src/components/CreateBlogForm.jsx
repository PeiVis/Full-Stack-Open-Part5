import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
const createBlogFrom = ({ setNotification, setNotificationType, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await createBlog({ title, author, url })
      setAuthor('')
      setTitle('')
      setUrl('')
      setNotification(`Blog '${blog.title}' created`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification('Error creating blog')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
    title
        <input
          placeholder='title'
          type="text"
          value={title}
          name="title"
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
    author
        <input
          id='author'
          placeholder='author'
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
    url
        <input
          id='url'
          placeholder='url'
          type="text"
          value={url}
          name="title"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create blog</button>
    </form>
  )
}

export default createBlogFrom
