const PersonForm = ({
  addPerson,
  name,
  number,
  handleNameChange,
  handleNumberChange,
}) => (
  <>
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        number:
        <input
          value={number}
          onChange={handleNumberChange}
          minLength="8"
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

export default PersonForm;
