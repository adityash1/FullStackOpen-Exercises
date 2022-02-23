import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
      <PersonForm
        onSubmit={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </>
  )
}

export default App