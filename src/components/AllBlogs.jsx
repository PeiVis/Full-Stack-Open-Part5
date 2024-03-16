import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
const allBlogs = ({ user, likeBlog, deleteBlog, blogs }) => {
  return (
    <ul id='allBlogs'>{blogs.map(blog => <Blog deleteBlog={deleteBlog} likeBlog={likeBlog} user={user} key={blog.id} blog={blog} />)}</ul>

  )
}

export default allBlogs
