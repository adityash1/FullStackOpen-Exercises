import axios from 'axios'

const getAll = async () => {
    const response = await axios.get('http://localhost:3001/anecdotes')
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }