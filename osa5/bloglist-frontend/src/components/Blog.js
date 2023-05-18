import { useState } from 'react'
import PropTypes from 'prop-types'

const RemoveButton = ({ user, blog, handleRemove }) => {
	if (blog.user.username === user.username) {
		return (
			<button
				className='remove-button'
				onClick={() => handleRemove(blog)}
			>
				remove
			</button>
		)
	}
}


const Blog = ({ blog, handleLike, handleRemove, user }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [show, setShow] = useState(false)
	const [likes, setLikes] = useState(blog.likes)

	if (!show) {
		return (
			<div className='blog-entry' style={blogStyle}>
				{blog.title} {blog.author}
				<button className='view'
					onClick={() => setShow(true)}>view</button>
			</div>
		)
	}
	return (
		<div className='blog-entry' style={blogStyle}>
			{blog.title} {blog.author}
			<button id='hide' onClick={() => setShow(false)}>hide</button>
			<div>
				{blog.url}
			</div>
			<div>
				{blog.likes} <button className='like' onClick={() => {
					handleLike(blog)
					setLikes(likes+1)
				}}>like</button>
			</div>
			<div>
				{blog.user.name}
			</div>
			<RemoveButton
				user={user}
				blog={blog}
				handleRemove={handleRemove}
			/>
		</div>
	)

}
Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	handleLike: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}
export default Blog
