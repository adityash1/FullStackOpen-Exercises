import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

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
  initialState: [],
  reducers: {
    setVote: (state, action) => {
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
    setCreate: (state, action) => {
      const content = action.payload
      state.concat({
        content,
        // id: getId(), // this is not needed, because backend will generate id
        // votes: 0 // this is not needed, because backend will generate votes
      })
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(setCreate(anecdote))
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    await anecdoteService.vote(id)
    dispatch(setVote(id))
  }
}

export const { setVote, setCreate, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer