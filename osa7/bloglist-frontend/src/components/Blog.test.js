import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
	const handleLike = jest.fn()
	const handleRemove = jest.fn()
	const blog = {
		title: 'testi title',
		author: 'testi author',
	}
	const user = {
		username: 'mock',
	}

	render(
		<Blog
			blog={blog}
			handleLike={handleLike}
			handleRemove={handleRemove}
			user={user}
		/>
	)
})

test('renders all after click', async () => {
	const mockHandleLike = jest.fn()
	const mockHandleRemove = jest.fn()
	const mockUser = {
		username: 'mock',
		name: 'mock name',
	}
	const blog = {
		title: 'testi title',
		author: 'testi author',
		user: { mockUser },
	}

	render(
		<Blog
			blog={blog}
			handleLike={mockHandleLike}
			handleRemove={mockHandleRemove}
			user={mockUser}
		/>
	)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	const title = screen.findByText('testi title')
	const author = screen.findByText('testi author')
	const adder = screen.findByText('mock name')
})

test('double like', async () => {
	const mockHandleLike = jest.fn()
	const mockHandleRemove = jest.fn()
	const mockUser = {
		username: 'mock',
		name: 'mock name',
	}
	const blog = {
		title: 'testi title',
		author: 'testi author',
		user: { mockUser },
	}

	render(
		<Blog
			blog={blog}
			handleLike={mockHandleLike}
			handleRemove={mockHandleRemove}
			user={mockUser}
		/>
	)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	const like = screen.getByText('like')
	await user.click(like)
	await user.click(like)

	expect(mockHandleLike.mock.calls).toHaveLength(2)
})
