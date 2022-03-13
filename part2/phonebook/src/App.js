import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { useState, useEffect } from "react";
import list from "./services/list";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    list.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

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
    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ) &&
      persons.find((person) => person.number === newNumber)
    ) {
      alert(`${newName} is already added to the phonebook`);
    } else if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      const result = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (result) {
        const person = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const id = person.id;
        const newPerson = { ...person, number: newNumber };
        list.update(id, newPerson).then((response) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : response))
          );
        });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      list.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(newPerson));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  // event handler function for delete button
  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result)
      list
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          window.confirm(`${person.name} was deleted from the phonebook`);
        })
        .catch((error) => {
          alert({
            message: `${person.name} was already removed`,
            style: "error",
          });
          setPersons(persons.filter((p) => p.id !== person.id));
        });
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
      <ContactList
        key={persons.id}
        persons={persons}
        filter={filter}
        onRemove={handleDelete}
      />
    </>
  );
};

export default App;
