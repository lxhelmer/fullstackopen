const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_BLOGS':
			return action.payload
		case 'ADD':
			return state.concat(action.payload)
		default:
			return state
	}
}

export const addBlog = (blog) => {
	return {
		type: 'ADD',
		payload: blog,
	}
}

export const setBlogs = (blogs) => {
	return {
		type: 'SET_BLOGS',
		payload: blogs,
	}
}

export default blogReducer
