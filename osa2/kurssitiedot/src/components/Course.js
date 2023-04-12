const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
	const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0)
	return (
		<p>Total of {sum} exercises.</p>
	)
}
const Part = ({ part }) => {
  return (
   <li> {part.name} {part.exercises} </li>
	)
}
const Content = ({ parts }) => 

  <ul style={{listStyle: 'none'}}>
		{parts.map(part =>
			<Part part={part} key={part.id}/>
		)}
  </ul>

const Course = ( {course} ) => {
	return (
		<>
			<Header course = {course.name}/>
			<Content parts = {course.parts}/>
		  <Total parts = {course.parts}/>
		</>
	)
}

export default Course
