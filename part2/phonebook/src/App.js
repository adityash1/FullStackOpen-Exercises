import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const found = persons.find(person => person.name === newName)
  const Person = ({ persons }) => <p>{persons.name} {persons.number}</p>


  const addContact = (event) => {
    event.preventDefault()

    if (found)
      alert(`${newName} is already added to phonebook`)
    else {
      const contactObject = {
        name: newName,
        number: newNumber,
        id: persons.length,
      }
      setPersons(persons.concat(contactObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name:
          <input required
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input required type="tel" 
            pattern="[0-9]{10,10}"
            value={newNumber}
            onChange={handleNumberChange}
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