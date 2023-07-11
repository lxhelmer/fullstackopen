import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
}) => {
	return (
		<Form onSubmit={handleSubmit}>
			<div>
				<p>log in to application</p>
				<Form.Label>username</Form.Label>
				<input
					type="text"
					value={username}
					name="Username"
					onChange={handleUsernameChange}
					id="username"
				/>
			</div>
			<div>
				<Form.Label>password</Form.Label>
				<input
					type="password"
					value={password}
					name="Password"
					onChange={handlePasswordChange}
					id="password"
				/>
			</div>
			<Button variant="secondary" type="submit" id="login-button">
				login
			</Button>
		</Form>
	)
}
LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
}
export default LoginForm
