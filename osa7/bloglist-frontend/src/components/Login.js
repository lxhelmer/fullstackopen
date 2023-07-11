import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { notifChange, nclear } from '../reducers/notifReducer'
import LoginForm from '../components/LoginForm'

const Login = () => {
	const navigate = useNavigate()
	const Notification = ({ message }) => {
		if (message === null) {
			return null
		}
		return <h1>{message}</h1>
	}

	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const notif = useSelector((state) => state.notif)

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
			navigate('/')
		} catch (exception) {
			dispatch(notifChange('wrong credentials'))
			setTimeout(() => {
				dispatch(nclear())
			}, 5000)
		}
	}
	return (
		<>
			<Notification message={notif} />
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

export default Login
