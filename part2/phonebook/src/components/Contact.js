const Contact = ({ person, onRemove }) => (
  <>
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => onRemove(person)}>delete</button>
    </div>
  </>
);

export default Contact;
