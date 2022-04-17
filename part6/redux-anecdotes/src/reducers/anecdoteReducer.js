import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE':
//       const sortedState = state.map(anec =>
//         anec.id !== action.data.id ? anec : { ...anec, votes: anec.votes + 1 }
//       )
//       return sortedState.sort((a, b) => b.votes - a.votes)
//     case 'NEW_ANECDOTE':
//       return [...state, action.data]
//     default:
//       return state
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const sortedState = state.map(note => note.id !== id ?
        note : changedAnecdote
      )
      return sortedState.sort((a, b) => b.votes - a.votes)
    },
    createAnecdote: (state, action) => {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    }
  },
})

export const { vote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer