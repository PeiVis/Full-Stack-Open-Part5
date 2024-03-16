import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
test('renders content and hides oter content', async () => {
  const blog = {
    user: {
      name: 'test user',
      username: 'user',
      id: '65be50a4078a64914365ec33'
    },
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }

  // const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} user={blog.user}/>)
  /*
  const user = userEvent.setup()
  const button = screen.getByText('Show')

  await user.click(button)
*/
  const hiddenBlogDiv = container.querySelector('.togglableContent')
  expect(hiddenBlogDiv).toHaveStyle('display: none')

  const title = screen.getByText('React patterns')
  expect(title).toBeDefined()
  const author = screen.getByText('Michael Chan')
  expect(author).toBeDefined()
})

test('shows content when button is pressed', async () => {
  const blog = {
    user: {
      name: 'test user',
      username: 'user',
      id: '65be50a4078a64914365ec33'
    },
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }

  // const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} user={blog.user}/>)
  const hiddenBlogDiv = container.querySelector('.togglableContent')
  expect(hiddenBlogDiv).toHaveStyle('display: none')

  const user = userEvent.setup()
  const button = screen.getByText('Show')

  await user.click(button)

  const visibleBlogDiv = container.querySelector('.togglableContent')
  expect(visibleBlogDiv).not.toHaveStyle('display: none')
})
