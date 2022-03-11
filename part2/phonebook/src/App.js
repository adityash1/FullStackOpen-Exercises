import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Persons from "./components/ContactList";
import { useState, useEffect } from "react";

import axios from "axios";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {    
    console.log('effect')    
    axios      
    .get('http://localhost:3001/persons')      
    .then(response => {        
      console.log('promise fulfilled')        
      setPersons(response.data)      
    })  
  }, [])

  // event handler function for filter input
  const handleFilterChange = (event) => {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilter(filtered);
  };

  // event handler function for name input
  const handleNameChange = (event) => setNewName(event.target.value);

  // event handler function for number input
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  // event handler function for form submission
  const addContact = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(`There already exist a contact with the number ${newNumber}`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter onFilter={handleFilterChange} />
      <h2>Add a new contact</h2>
      <ContactForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons key={persons.id} persons={persons} filter={filter} />
    </>
  );
};

export default App;
