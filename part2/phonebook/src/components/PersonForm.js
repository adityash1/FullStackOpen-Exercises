const PersonForm = ({
	onSubmit, handleNameChange, handleNumberChange, newName, newNumber,
}) => (
	<>
		<form onSubmit={onSubmit}>
			<div>
				name:
				<input 
					required
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
				/>
			</div>
			<button type="submit">add</button>
		</form>
	</>
)

export default PersonForm