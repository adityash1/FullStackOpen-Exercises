import { useState } from 'react'

const Filter = ({ onFilter }) => {
  return (
    <>
      filter shown with <input onChange={onFilter} />
    </>
  )
}

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons, filter }) => {
  const data = filter.length ? filter : persons;
  return (
    <>
      {data.map(person => 
        <Person key={person.name} person={person} />
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState([]);

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const found = persons.find(person => person.name === newName)
  
  const onFilter = (e) => {
    const filtered = persons.filter(person => 
      person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilter(filtered);
  };

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
      <Filter onFilter={onFilter} />
      <h2>add a new</h2>
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
        <Persons persons={persons} filter={filter} />
      </div>
    </>
  )
}

export default App