import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
	
  const vote = (anecdote) => {
		dispatch(updateAnecdote(anecdote))
		dispatch(setNotification(
			`you voted '${anecdote.content}'`, 5000))
  }

	return (
		<>
      {anecdotes
				.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
				.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
		</>
	)
}

export default AnecdoteList
