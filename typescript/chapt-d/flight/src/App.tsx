import { useState, useEffect } from 'react'
import axios from 'axios'
import CSS from "csstype"
interface Entry {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment: string,
}

type NewEntry = Omit<Entry, 'id'>

const EntryCom = ({entry}: {entry: Entry} ) => {
  return (
    <div>
      {entry.date}
      <br/>
      {entry.visibility}
      <br/>
      {entry.weather}
      <br/>
      {entry.comment}
      <br/>
    </div>
  )
}


const baseUrl = 'http://localhost:3000/api/diaries'

const getEntries = () => {
    return axios.get<Entry[]>(baseUrl)
        .then(response => response.data as Entry[])
}

const createEntry = (object: NewEntry) => {
  try {
    return axios
      .post<Entry>(baseUrl, object)
      .then(response => response.data)
  } catch (error) {
    throw error
  }
}


const Entries = ({entries}: {entries: Entry[]}): React.JSX.Element => {
  return (
    <>
      <h2>Entries</h2>
      {entries ? entries.map((d) => <EntryCom entry={d} key={d.date}/>) : null}
    </>
  )
}


function App() {
  const [diaries, setDiaries] = useState<Entry[]>([])
  const [date, setDate] = useState('2025-01-01')
  const [visib, setVisib] = useState('')
  const [weath, setWeath] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const entryToAdd: NewEntry = {
      date: date,
      weather: weath,
      visibility: visib,
      comment: comment
    }
    createEntry( entryToAdd ).then(data => {
      setDiaries(diaries.concat(data))
    }).catch(error =>  {
    if (axios.isAxiosError(error)) {
      if (error && error.response && error.response.data) {
        setError('Error: '+ error.response.data)
      }
    } else {
      console.log(error)
    }
    })
  }

  useEffect(() => {
    getEntries().then(data => {
      setDiaries(data)
    })
  }, [])

  const errorStyle: CSS.Properties = {
    color: "red"
  }

  return (
    <>
      <h2 style={errorStyle}>
        {error}
      </h2>
      <form onSubmit={entryCreation}>
        date:
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
        <br/>
        visibility:
        great
        <input type="radio" name="visib" value="great" onChange={() => setVisib("great")}/>
        good
        <input type="radio" name="visib" value="good" onChange={() => setVisib("good")}/>
        ok
        <input type="radio" name="visib" value="ok" onChange={() => setVisib("ok")}/>
        poor
        <input type="radio" name="visib" value="poor" onChange={() => setVisib("poor")}/>
        <br/>
        weather {' '}
        sunny
        <input type="radio" name="weath" onChange={() => setWeath("sunny")}/>
        rainy
        <input type="radio" name="weath" onChange={() => setWeath("rainy")}/>
        cloudy
        <input type="radio" name="weath" onChange={() => setWeath("cloudy")}/>
        stormy
        <input type="radio" name="weath" onChange={() => setWeath("stormy")}/>
        windy
        <input type="radio" name="weath" onChange={() => setWeath("windy")}/>
        <br/>
        comment
        <input value={comment} onChange={(event) => setComment(event.target.value)}/>
        <br/>
        <button type='submit'>add</button>
      </form>
      <Entries entries={diaries}/>
    </>
  )
}

export default App
