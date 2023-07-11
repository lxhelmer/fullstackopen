import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import { uclear, setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'

import Login from './components/Login'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import Button from 'react-bootstrap/Button'

const App = () => {
	const dispatch = useDispatch()
	const [users, setUsers] = useState([])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
	}, [])

	useEffect(() => {
		blogService.getAll().then((res) => dispatch(setBlogs(res)))
	}, [])

	useEffect(() => {
		userService.getAll().then((res) => setUsers(res))
	}, [])

	const user = useSelector((state) => state.user)
	const blogs = useSelector((state) => state.blogs)

	return (
		<div className="container">
			<Router>
				<div style={{ background: 'lightgrey' }}>
					<Link
						to={'/'}
						style={({ marginRight: '5px' }, { marginLeft: '5px' })}
					>
						<Button variant="secondary">blogs</Button>
					</Link>
					<Link
						to={'/users'}
						style={({ marginRight: '5px' }, { marginLeft: '5px' })}
					>
						<Button variant="secondary">users</Button>
					</Link>

					{user ? (
						<a
							style={
								({ marginRight: '5px' }, { marginLeft: '5px' })
							}
						>
							<Button
								variant="secondary"
								id="logout"
								onClick={() => {
									dispatch(uclear())
									window.localStorage.removeItem(
										'loggedBlogUser'
									)
									blogService.clearToken()
								}}
							>
								logout
							</Button>
							{user.name} logged in
						</a>
					) : (
						<Login />
					)}
				</div>
				<h1>Blogs</h1>

				<Routes>
					<Route path="/users/:id" element={<User users={users} />} />
					<Route path="/users" element={<Users users={users} />} />
					<Route
						path="/blogs/:id"
						element={
							<Blog
								users={users}
								setUsers={setUsers}
								blogs={blogs}
							/>
						}
					/>
					<Route
						path="/"
						element={<Home users={users} setUsers={setUsers} />}
					/>
				</Routes>
			</Router>
		</div>
	)
}

export default App
