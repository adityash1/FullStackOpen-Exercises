import React from 'react';

const Header = ({ name }) => {
	return (
		<>
			<h1>{name}</h1>
		</>
	)
}

const Content = ({ parts }) => {
	return (
		<>
			{parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</>
	)
}

const Part = ({ part }) => {
	return (
		<>
			<p>
				{part.name} {part.exercises}
			</p>
		</>
	)
}

const Total = ({ parts }) => {
	return (
		<>
			<p> 
				total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises 
			</p>
		</>
	)
}

const Course = ({ course }) => {
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	)
}

export default Course