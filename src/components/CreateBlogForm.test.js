import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm />', async () => {
  const createBlog = jest.fn()
  const setNotification = jest.fn()
  const setNotificationType = jest.fn()

  const user = userEvent.setup()

  render(<CreateBlogForm setNotification={setNotification} setNotificationType={setNotificationType} createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('Create blog')

  await user.type(inputTitle, 'testing title')
  await user.type(inputAuthor, 'testing author')
  await user.type(inputUrl, 'testing url')

  await user.click(sendButton)

  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})
