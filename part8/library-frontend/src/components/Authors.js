import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useField } from '../hooks'
import { omit } from 'lodash'
import { useState } from 'react'
import Select from 'react-select'

const SelectAuthor = ({ authors, value, onChange }) => {
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))
  return (
    <div>
      <Select options={options} value={value} onChange={onChange} />
    </div>
  )
}

const Authors = ({ show }) => {
  const [name, setName] = useState(null)
  const born = useField('number')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleUpdate = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: {
        name: name.value,
        setBornTo: Number(born.value),
      },
    })

    setName('')
    born.reset()
  }

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  if (!show) return null
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>set birthyear</h3>
        <form onSubmit={handleUpdate}>
          <SelectAuthor
            authors={authors}
            value={name}
            onChange={(name) => setName(name)}
          />
          <div>
            born:
            <input {...omit(born, 'reset')} />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
