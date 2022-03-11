const ContactForm = ({
  addContact,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <>
      <form onSubmit={addContact}>
        <div>
          name:{" "}
          <input
            required
            type="text"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            required
            type="tel"
            pattern="[0-9]{10,10}"
            value={newNumber}
            onChange={handleNumberChange}
            placeholder="e.g. 1234567890"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
