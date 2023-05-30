import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		addAnecdote(state, action) {
			state.push(action.payload)
		},
		addVote(state, action) {
			const id = action.payload
			const voted = state.find(n => n.id === id)
			const changed = {
				...voted,
				votes: voted.votes+1
			}
			return state.map(anecdote =>
				anecdote.id !== id ? anecdote : changed
			)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	},
})


export const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(addAnecdote(newAnecdote))
	}
}

export const updateAnecdote = anecdote => {
	return async dispatch => {
		await anecdoteService.update(anecdote)
		dispatch(addVote(anecdote.id))
	}
}

export default anecdoteSlice.reducer
