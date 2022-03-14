const Filter = ({ value, handleChange }) => {
  return <>
    Filter shown with
    <input
      value={value}
      onChange={handleChange}
    />
  </>
}

export default Filter