import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LikeButton from './LikeButton'
import userEvent from '@testing-library/user-event'

test('Press like test', async () => {
  const mockHandler = jest.fn()

  const blog = {

    user: {
      name: 'test',
      username: 'test',
      id: '65c5e5a83f0bfeed7a90cb76'
    },
    title: 'asdasd',
    author: 'dsasd',
    url: 'dsaasdasd',
    likes: 1,
    id: '65ca2b5f5e6aff675c1e871c'

  }

  render(<LikeButton blog={blog} likeBlog={mockHandler}/>)
  const user = userEvent.setup()
  const button = screen.getByText('Like')
  expect(mockHandler.mock.calls).toHaveLength(0)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
