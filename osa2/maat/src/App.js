import {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) =>  {
	const [weather, setWeather] = useState(null)
	const weatherHook = () => {
		axios
			.get(`https://api.open-meteo.com/v1/forecast?
			latitude=${country.capitalInfo.latlng[0]}&
			longitude=${country.capitalInfo.latlng[1]}&
			current_weather=true`)
			.then(response => {
				setWeather(response.data.current_weather)
			})
	}
	useEffect(weatherHook,[])
	if (weather) {
		return (
			<>
				<h2>Weather in {country.capital}</h2>
				<p>temperature {weather.temperature} Celsius (updated:{weather.time.substring(11)})</p>
				<p>wind {weather.windspeed} m/s</p>
			</>
		)
	}	
}

const Country = ({country}) => {
	if (country) {
		return (
			<>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<p>languages:</p>
			<ul>
				{Object.values(country.languages).map(language =>
					<li key={language}>
						{language}
					</li>)
				}
			</ul>
			<img src={country.flags.png}/>
			<Weather country={country}/>
			</>
		)
	}
}
const Countries = ({countries, setShown}) => {
	if (countries.length > 10) {
		return (
			<p>Too many matches, specify another filter</p>
		)
	} else if (countries.length > 1){
		return (
			<ul>
			{
				countries.map((country) => 
				<li key={country.name.common}>
					{country.name.common} 
					<button onClick={() => setShown([country])}>show</button>	
				</li>
				)
			}
			</ul>
		)
	} else if (countries.length !== 0) {
		const country = countries.find(country => country.name.common != null)
		return (
			<>
			<Country country = {country}/>
			</>
		)
	}
}

const App = () => {
	const [newSearch, setSearch] = useState('')
	const [countries, setCountries] = useState([])
	const [shown, setShown] = useState([])

	const hook = () => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				setCountries(response.data)
			})
	}
	useEffect(hook,[])

	const handleNewSearch = (event) => {
		setSearch(event.target.value)
		setShown(countries.filter(country =>
			country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
	}

	return (
		<div>
			find countries
			<input value={newSearch}
							onChange={handleNewSearch}	
			/>
		<Countries countries={shown} setShown={setShown}/>
		</div>

	)
}
export default App;
