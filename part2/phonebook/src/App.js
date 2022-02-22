import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const Person = ({ persons }) => <p>{persons.name}</p>
  const found = persons.find(person => person.name === newName)

  function addName(event) {
    event.preventDefault()

    if (found)
      alert(`${newName} is already added to phonebook`)
    else {
      const nameObject = {
        name: newName,
        id: persons.length,
      }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(x => 
          <Person key={x.id} persons={x} />
        )}
      </div>
    </>
  )
}

export default App