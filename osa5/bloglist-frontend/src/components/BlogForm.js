import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}


	return (
		<div>
			<h1>create new</h1>
			<form onSubmit={addBlog}>
				<div>
				title:
					<input
						type="text"
						value={title}
						name="title"
						onChange={({ target }) => setTitle(target.value)}
						id='title'
					/>
				</div>
				<div>
				author:
					<input
						type="text"
						value={author}
						name="author"
						onChange={({ target }) => setAuthor(target.value)}
						id='author'
					/>
				</div>
				<div>
				url:
					<input
						type="text"
						value={url}
						name="url"
						onChange={({ target }) => setUrl(target.value)}
						id='url'
					/>
				</div>
				<button type="submit" id='create'>create</button>
			</form>
		</div>
	)
}
BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm
