const likeButton = ({ likeBlog, blog }) => {
  const handleLike = async (event) => {
    event.preventDefault()
    try {
      const title = blog.title
      const author = blog.author
      const url = blog.url
      const likes = blog.likes + 1
      const blogUser = blog.user.id
      const blogId = blog.id
      const user = blog.user
      await likeBlog({ blogId, blogUser, title, author, url, likes, user })
    } catch (error) {
    }
  }
  return (
    <button id="likeButton" onClick={handleLike}>
        Like
    </button>
  )
}

export default likeButton
