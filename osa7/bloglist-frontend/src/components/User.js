import { useParams } from 'react-router-dom'

const User = ({ users }) => {
	const id = useParams().id
	const user = users.find((usr) => usr.id.toString() === id.toString())
	if (!user) {
		return null
	}
	return (
		<>
			<h2>{user.name}</h2>
			<div>added blogs</div>
			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</>
	)
}

export default User
