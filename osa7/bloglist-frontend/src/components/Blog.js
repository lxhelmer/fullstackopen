import PropTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { notifChange, nclear } from '../reducers/notifReducer'

const RemoveButton = ({ user, blog, handleRemove }) => {
	if (blog.user.username === user.username) {
		return (
			<button
				className="remove-button"
				onClick={() => handleRemove(blog)}
			>
				remove
			</button>
		)
	}
}

const Blog = ({ users, setUsers, blogs }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const id = useParams().id
	const blog = blogs.find((b) => b.id.toString() === id.toString())
	const [commentInput, setCommentInput] = useState('')

	if (!blog) {
		return null
	}

	const handleLike = async (blogObject) => {
		blogObject.likes = blogObject.likes + 1
		try {
			await blogService.update(blogObject.id, blogObject)
			dispatch(
				setBlogs(
					blogs.map((blog) =>
						blog.title === blogObject.title ? blogObject : blog
					)
				)
			)
		} catch (exception) {
			dispatch(notifChange(exception.message))
			setTimeout(() => {
				dispatch(nclear())
			}, 5000)
		}
	}
	const handleRemove = async (blogObject) => {
		if (window.confirm(`remove ${blogObject.title}?`)) {
			try {
				await blogService.remove(blogObject.id)
				/* eslint-disable */
				setUsers(
					users.map((usr) =>
						usr.username !== user.username
							? usr
							: {
									...usr,
									blogs: usr.blogs.filter(
										(b) =>
											b.id.toString() !==
											blogObject.id.toString()
									),
							  }
					)
				)
				/* eslint-enable */
				dispatch(
					setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
				)
				navigate('/')
			} catch (exception) {
				dispatch(notifChange(exception))
				setTimeout(() => {
					dispatch(nclear())
				}, 5000)
			}
		}
	}
	const addComment = async (event) => {
		event.preventDefault()
		try {
			const updatedBlog = {
				...blog,
				comments: blog.comments.concat(commentInput),
			}
			await blogService.addComment(id, updatedBlog)
			dispatch(
				setBlogs(
					blogs.map((blog) => (blog.id !== id ? blog : updatedBlog))
				)
			)
		} catch (exception) {
			dispatch(notifChange(exception))
			setTimeout(() => {
				dispatch(nclear())
			}, 5000)
		}
	}
	return (
		<div className="blog-entry">
			<a href={blog.url}>{blog.url}</a>
			<div>
				{blog.likes}{' '}
				<button
					className="like"
					onClick={() => {
						handleLike(blog)
					}}
				>
					like
				</button>
			</div>
			<div>added by {blog.user.name}</div>
			<RemoveButton user={user} blog={blog} handleRemove={handleRemove} />
			<h2>comments</h2>
			<form onSubmit={addComment}>
				<input
					type="text"
					value={commentInput}
					onChange={({ target }) => setCommentInput(target.value)}
				/>
				<button type="submit">add comment</button>
			</form>
			<ul>
				{blog.comments.map((c) => (
					<li key={c}>{c}</li>
				))}
			</ul>
		</div>
	)
}
Blog.propTypes = {
	blogs: PropTypes.array.isRequired,
}
export default Blog
