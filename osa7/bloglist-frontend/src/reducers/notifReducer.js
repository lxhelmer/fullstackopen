const notifReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_NOTIF':
			return action.payload
		default:
			return state
	}
}
export const notifChange = (notif) => {
	return {
		type: 'SET_NOTIF',
		payload: notif,
	}
}
export const nclear = () => {
	return {
		type: 'SET_NOTIF',
		payload: null,
	}
}

export default notifReducer
