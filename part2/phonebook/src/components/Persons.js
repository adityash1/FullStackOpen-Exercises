import Person from './Person'

const Persons = ({ persons, filter }) => {
  // if there is something typed in filter
  const data = filter.length ? filter : persons;
  return (
    <>
      {data.map(person => 
        <Person key={person.name} person={person} />
      )}
    </>
  )
}

export default Persons