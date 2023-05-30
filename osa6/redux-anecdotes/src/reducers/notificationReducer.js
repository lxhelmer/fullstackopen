import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setText(state, action) {
			return action.payload
		}
	},
})

export const setNotification = (text, time) => {
	return async dispatch => {
		dispatch(setText(text))
		setTimeout(() => {
			dispatch(setText(null))},time)
	}
}

export const { setText } = notificationSlice.actions
export default notificationSlice.reducer
