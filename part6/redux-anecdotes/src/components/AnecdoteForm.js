// import { useDispatch } from 'react-redux'
// import { create } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // const newAnecdote = await anecdoteService.createNew(content)
        // dispatch(createAnecdote(content)).then(() => {
            // dispatch(setNotification(`You created '${content}'`, 10))
        // })
        props.createAnecdote(content).then(() => {
            props.setNotification(`You created '${content}'`, 10)
        })
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

// export default AnecdoteForm
export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)
