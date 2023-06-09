import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const clearToken = () => {
	token = null
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}
const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then((response) => response.data)
}

const remove = (id) => {
	const config = {
		headers: { Authorization: token },
	}
	const request = axios.delete(`${baseUrl}/${id}`, config)
	return request.then((response) => response.data)
}
const addComment = (id, newObject) => {
	const request = axios.post(`${baseUrl}/${id}/comments`, newObject)
	return request
}

export default {
	getAll,
	create,
	update,
	setToken,
	remove,
	clearToken,
	addComment,
}
