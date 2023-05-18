import { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}
	return (
		<h1>
			{message}
		</h1>
	)
}


const App = () => {
	const blogFormRef = useRef()
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notif, setNotif] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])



	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setNotif('wrong credentials')
			setTimeout(() => {
				setNotif(null)
			}, 5000)
		}
	}


	const handleBlog = async (blogObject) => {
		try {
			const newBlog = await blogService.create(blogObject)
			newBlog.user = user
			blogFormRef.current.toggleVisibility()
			setBlogs(blogs.concat(newBlog))
			setNotif(`new blog ${newBlog.title} by ${newBlog.author} added`)
			setTimeout(() => {
				setNotif(null)
			}, 5000)
		} catch (exception) {
			setNotif(exception)
			setTimeout(() => {
				setNotif(null)
			}, 5000)
		}
	}

	const handleLike = async (blogObject) => {
		blogObject.likes = blogObject.likes + 1
		try {
			await blogService.update(blogObject.id, blogObject)
			setBlogs(blogs.map(blog => blog.title === blogObject.title
				? blogObject
				: blog
			))
		} catch (exception) {
			setNotif(exception)
			setTimeout(() => {
				setNotif(null)
			}, 5000)
		}
	}
	const handleRemove = async (blogObject) => {
		if (window.confirm(`remove ${blogObject.title}?`)) {
			try {
				await blogService.remove(blogObject.id)
				setBlogs(blogs.filter(blog => blog.id !== blogObject.id))

			} catch (exception) {
				setNotif(exception)
				setTimeout(() => {
					setNotif(null)
				}, 5000)
			}
		}
	}

	if (user === null) {
		return (
			<>
				<Notification message={notif}/>
				<LoginForm
					handleSubmit={handleLogin}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
					username={username}
					password={password}
				/>
			</>
		)
	}
	return (
		<div>
			<h1>Blogs</h1>
			<Notification message={notif}/>
			<div>
				<p>
					{user.name} logged in
					<button id='logout' onClick={() => {
						setUser(null)
						window.localStorage.removeItem('loggedBlogUser')
					}}>
						logout
					</button>
				</p>
				<Togglable buttonLabel='new blog' ref={blogFormRef}>
					<BlogForm createBlog={handleBlog}/>
				</Togglable>
				<div id='list'>
					{blogs.sort((a, b) => b.likes - a.likes).map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
							handleLike={handleLike}
							handleRemove={handleRemove}
							user={user}
						/>
					)}
				</div>
			</div>


		</div>
	)
}

export default App
