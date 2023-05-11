import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
	return (
			<div>
				filter shown with
				<input 	value={props.newFilter}
								onChange={props.handleFilter}/>
			</div>
	)
}
const PersonForm = (props) => {
	return (
      <form onSubmit={props.addPerson}>
        <div>
          name: <input
									value={props.newName}
									onChange={props.handleNameChange}
								/>
        </div>
				<div>
					number: <input
										value={props.newNum}
										onChange={props.handleNumChange}
									/>
				</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}
const Persons = ({ persons, newFilter, deleteHandler}) => {
	return (
			<ul style={{ listStyle:'none'}}>
			{persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) =>
				<li key={person.name}>
					{person.name} {person.number}
					<button onClick={(e) => deleteHandler(person)}>delete</button>
				</li>)
			}
			</ul>
	)
}
const Notification = ({message}) => {
	if (message === null) {
		return null
	} else {
		return (
			<div className="notif"> 
				{message}
			</div>
		)
	}
}

const Error = ({message}) => {
	if (message === null) {
		return null
	} else {
		return (
			<div className="error">
				{message}
			</div>
		)
	}
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])

  const [newName, setNewName] = useState('')
	const [newNum, setNewNum] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [notification, setNotification] = useState(null)
	const [error, setError] = useState(null)

	const hook =  () => {
		personService
			.get()
			.then(response => {
				setPersons(response)
			})
	}
	useEffect(hook, [])

	const handleFilter = (event) => {
		console.log(event.target.value)
		setNewFilter(event.target.value)
	}
	const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}

	const handleNumChange = (event) => {
		console.log(event.target.value)
		setNewNum(event.target.value)
	}

	const deleteHandler = (remPerson) => {
		if (window.confirm(`Are you sure you wan't to delete ${remPerson.name}`)) {
			personService
				.remove(remPerson.id)
					.then(res => {
					setPersons(persons.filter(person => person.id !== remPerson.id))
					setNotification(`Removed ${remPerson.name}`)
					setTimeout(() => {
						setNotification(null)
					}, 5000)

				})
		}
	}

	const addPerson = (event) => {
		const personObject = {name: newName, number: newNum}
		event.preventDefault()
		if (persons.some(person => person.name === newName)) {
			const personId = persons.filter(person => person.name === newName).map(person => person.id)
				if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
					personService
							.update(personId,personObject)
							.then(returnPerson => {
							setPersons(persons.filter(person => person.name !== newName).concat(returnPerson))
							setNewNum('')
							setNewName('')
							setNotification(`Changed number for ${returnPerson.name}`)
								setTimeout(() => {
								setNotification(null)
								}, 5000)
							})
							.catch(error => {
								setError(`Information of ${newName} has already been removed from the server`)
								setTimeout(() => {
									setError(null)
								}, 5000)
							})
				}
		} else {
			personService
				.create(personObject)
					.then(returnPerson => {
					setPersons(persons.concat(returnPerson))
					setNewNum('')
					setNewName('')
					setNotification(`Added ${returnPerson.name}`)
					setTimeout(() => {
						setNotification(null)
					}, 5000)
					})
				.catch(error => {
					setError(error.response.data.error)
					setTimeout(() => {
						setError(null)
					}, 5000)
				})
		}
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Notification message={notification}/> 
			<Error message={error}/>
			<Filter newFilter = {newFilter} handleFilter={handleFilter}/>	
			<h2>Add a new</h2>
			<PersonForm addPerson={addPerson} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/>
      <h2>Numbers</h2>
			<Persons persons={persons} newFilter={newFilter} deleteHandler={deleteHandler}/>
    </div>
  )
}


export default App
