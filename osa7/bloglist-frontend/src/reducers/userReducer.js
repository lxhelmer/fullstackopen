const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.payload
		default:
			return state
	}
}

export const setUser = (user) => {
	return {
		type: 'SET_USER',
		payload: user,
	}
}

export const uclear = () => {
	return {
		type: 'SET_USER',
		payload: null,
	}
}

export default userReducer
