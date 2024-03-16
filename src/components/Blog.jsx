import Togglable from './Togglable'
import LikeButton from './LikeButton'
import { useRef } from 'react'
import RemoveBlogButton from './RemoveBlogButton'
const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogRef = useRef()
  return (
    <li id='blog' style={blogStyle}>
      <p>{blog.title} </p>
      <p>{blog.author}</p>
      <div data-testid='blog'>
        <Togglable buttonLabel='Show' ref={blogRef}>

          <p>url: <a href={blog.url}>{blog.url}</a> </p>
          <p id='likes'>Likes: {blog.likes} <LikeButton blog={blog} likeBlog={likeBlog} /> </p>
          <p>User: {blog.user.name} </p>
          {blog.user.id === user.id && <RemoveBlogButton deleteBlog={deleteBlog} blog={blog} />}
        </Togglable>
      </div>
    </li>
  )
}

export default Blog
