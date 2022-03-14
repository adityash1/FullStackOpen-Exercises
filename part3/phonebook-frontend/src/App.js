import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    setNewName('')
    setNewNumber('')

    const existingPerson = persons.find(p => p.name === newPerson.name)
    if ( existingPerson ) {
      const ok = window.confirm(`${existingPerson.name} is already added to phonebook, update the number?`)
      if ( ok ) {

        personService.update(existingPerson.id, {...existingPerson, number: newNumber }).then(savedPerson => {
          setPersons(persons.map(p => p.id === existingPerson.id ? savedPerson : p ))
          notify(`Updated info of ${savedPerson.name}`)
        })
        .catch(error => {
          notify(
            `the person '${existingPerson.name}' was had already been from the server`, 'alert'
          )
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })

        return 
      }
    }

    personService.create(newPerson).then(savedPerson => {
      setPersons(persons.concat(savedPerson))
      notify(`Added ${savedPerson.name}`)
    })
  }

  const deletePerson = (id) => { 
    const toDelete = persons.find(p => p.id === id)
    const ok = window.confirm(`Delete ${toDelete.name}`)
    if (ok) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        notify(`Deleted ${toDelete.name}`)
      })  
    }
  }
 
  const personsToShow = (filter.length === 0) ? persons :
    persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        value={filter}
        handleChange={({ target }) => setFilter(target.value)}
      />
      <PersonForm 
        name={newName}
        number={newNumber}
        handleNameChange={({ target }) => setNewName(target.value)}
        handleNumberChange={({ target }) => setNewNumber(target.value)}
        addPerson={addPerson}
      />
      <Persons
        persons={personsToShow}
        handleDelete={deletePerson}
      />
    </div>
  )

}

export default App