const removeBlogButton = ({ blog, deleteBlog }) => {
  const blogId = blog.id

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      try {
        deleteBlog(blogId)
      } catch (error) {
      }
    }
  }
  return (
    <button id="deleteBlogButton" onClick={handleRemove}>
        Delete
    </button>
  )
}

export default removeBlogButton
