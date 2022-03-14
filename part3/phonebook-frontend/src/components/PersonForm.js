const PersonForm = ({ addPerson, name, number, handleNameChange, handleNumberChange}) => <>
  <form onSubmit={addPerson} >
    <div>
      name: 
      <input
        value={name}
        onChange={handleNameChange}
      />
    </div>
    <div>number:
      <input
        value={number}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
</>

export default PersonForm