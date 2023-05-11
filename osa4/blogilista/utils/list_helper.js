const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
}

const mostBlogs = (blogs) => {
	authors = {}
	blogs.map((blog) => {
		authors[blog.author] ? authors[blog.author] += 1 : authors[blog.author] = 1
	})
	const max = { 
		author: 'init',
		blogs: 0
	}
	Object.entries(authors).forEach(([k,v]) => {
		if (v >= max.blogs) {
			max.author = k
			max.blogs = v
		}
	})

	return max
}

const mostLikes = (blogs) => {
	authors = {}
	blogs.map((blog) => {
		authors[blog.author] ? authors[blog.author] += blog.likes : authors[blog.author] = blog.likes
	})
	const max = { 
		author: 'init',
		likes: 0
	}
	Object.entries(authors).forEach(([k,v]) => {
		if (v >= max.likes) {
			max.author = k
			max.likes = v
		}
	})

	return max
}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
