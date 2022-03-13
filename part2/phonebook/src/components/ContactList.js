import Contact from "./Contact";

const ContactList = ({ persons, filter, onRemove }) => {
  // if filter is empty, return all persons
  const appliedFilter = filter.length ? filter : persons;
  return (
    <>
      {appliedFilter.map((person) => (
        <Contact key={person.id} person={person} onRemove={onRemove}/>
      ))}
    </>
  );
};

export default ContactList;
