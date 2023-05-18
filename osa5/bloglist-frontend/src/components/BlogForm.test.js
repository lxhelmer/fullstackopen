import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('new blog', async () => {
	const mockCreate = jest.fn() 
	const user = userEvent.setup()

	
	const { container } = render(<BlogForm createBlog={mockCreate} />)
	
	const titleInput = container.querySelector('#title')
	const authorInput = container.querySelector('#author')
	const urlInput = container.querySelector('#url')
	
	await user.type(titleInput,'test title')
	await user.type(authorInput, 'test author')
	await user.type(urlInput, 'test url')

	const submit = screen.getByText('create')

	await user.click(submit)
	expect(mockCreate.mock.calls[0][0]).toEqual({title:'test title',author:'test author',url:'test url'})
})
