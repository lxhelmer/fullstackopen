import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

import { notifChange, nclear } from '../reducers/notifReducer'
import { addBlog } from '../reducers/blogReducer'

const Home = ({ users, setUsers }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const blogFormRef = useRef()

	const notif = useSelector((state) => state.notif)
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)
	if (!user) {
		return null
	}

	const Notification = ({ message }) => {
		if (message === null) {
			return null
		}
		return <h1>{message}</h1>
	}

	const handleBlog = async (blogObject) => {
		try {
			const newBlog = await blogService.create(blogObject)
			newBlog.user = user
			blogFormRef.current.toggleVisibility()
			dispatch(addBlog(newBlog))
			setUsers(
				users.map((usr) =>
					usr.username !== user.username
						? usr
						: { ...usr, blogs: usr.blogs.concat(newBlog) }
				)
			)
			dispatch(
				notifChange(
					`new blog ${newBlog.title} by ${newBlog.author} added`
				)
			)
			setTimeout(() => {
				dispatch(nclear())
			}, 5000)
		} catch (exception) {
			dispatch(notifChange(exception.message))
			setTimeout(() => {
				dispatch(nclear())
			}, 5000)
		}
	}

	return (
		<div>
			<Notification message={notif} />
			<div>
				<Togglable buttonLabel="new blog" ref={blogFormRef}>
					<BlogForm createBlog={handleBlog} />
				</Togglable>
				<ListGroup>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<ListGroup.Item
								action
								key={blog.id}
								onClick={() => navigate(`/blogs/${blog.id}`)}
							>
								<Link to={`/blogs/${blog.id}`}>
									{blog.title} {blog.author}
								</Link>
							</ListGroup.Item>
						))}
				</ListGroup>
			</div>
		</div>
	)
}

export default Home
