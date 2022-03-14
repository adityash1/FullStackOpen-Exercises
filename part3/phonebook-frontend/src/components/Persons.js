const Persons = ({ persons, handleDelete }) => {
  return <>
    <h2>Numbers</h2>
    {persons.map(person =>
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={()=>handleDelete(person.id)}>
          delete
        </button>
      </p>
    )}
  </>
}

export default Persons