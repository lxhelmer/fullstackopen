import { Link } from 'react-router-dom'
const Users = ({ users }) => {
	return (
		<>
			<h1> Users </h1>
			<table>
				<thead>
					<tr>
						<th />
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((usr) => (
						<tr key={usr.id}>
							<td>
								{' '}
								<Link to={`/users/${usr.id}`}>{usr.name}</Link>
							</td>
							<td> {usr.blogs.length} </td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Users
