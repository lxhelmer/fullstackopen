import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () =>  {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const text = event.target.text.value
		event.target.text.value = ''
		dispatch(createAnecdote(text))
		dispatch(setNotification(`added new anecdote '${text}'`,5000))
	}
	return (
		<>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="text" /></div>
        <button type="submit">create</button>
      </form>
		</>
	)
}

export default AnecdoteForm
