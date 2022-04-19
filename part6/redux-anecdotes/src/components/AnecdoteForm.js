import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { notify, mute } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(create(newAnecdote))
        dispatch(notify(`You created '${newAnecdote.content}'`))
        setTimeout(() => dispatch(mute()), 3000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
