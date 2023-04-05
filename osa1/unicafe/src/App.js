import { useState } from 'react'

const StatisticsLine = (props) => {
			return (
				<tr>
					<td>{props.name} </td>
					<td>{props.value} </td>
				</tr>
			)
}
const Avg = (props) => {
			return (
				<div>
				</div>
			)
}
const Button = (props) => {
	return (
		<>
			<button onClick={props.set}>{props.text}</button>
		</>
	)
}
const Statistics = (props) => {
	const good = props.good
	const neutral = props.neutral
	const bad = props.bad
	if (good+neutral+bad === 0) {
		return (
			<div>
				No feedback given
			</div>
		)
	}
	return (
		<table>
		<tbody>
				<StatisticsLine name="good" value = {good}/>
				<StatisticsLine name="neutral" value = {neutral}/>
				<StatisticsLine name="bad" value = {bad}/>
				<tr>
					<td>all</td>
					<td>{good + neutral + bad} </td>
				</tr>
				<tr>
					<td>average</td>
					<td>{(good*1 + bad*-1)/(good+neutral+bad)}</td>
				</tr>
				<tr>
					<td>positive</td>
					<td>{good/(good + neutral + bad)*100} %</td>
				</tr>
		</tbody>
		</table>
	)
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
				<p>
					<font size="5">give feedback</font>
				</p>
			<div>
				<Button set={() => setGood(good + 1)} text="good"/>
				<Button set={() => setNeutral(neutral + 1)} text="neutral"/>
				<Button set={() => setBad(bad + 1)} text="bad"/>
				<p>
					<font size="5">statistics</font>
				</p>
				<Statistics good={good} neutral={neutral} bad={bad}/>
			</div>
    </div>
  )
}

export default App
