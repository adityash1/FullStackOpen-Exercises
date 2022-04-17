import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { notify, mute } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(notify(`You voted for '${anecdote.content}'`))
        setTimeout(() => dispatch(mute()), 3000)
    }

    const anecdotesToShow = useSelector(state => {
        if (state.filter) {
            return anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
        return anecdotes
    })

    return (
        <div>
            {
                anecdotesToShow.map(anecdote =>
                    <Anecdote key={anecdote.id} anecdote={anecdote}
                        handleClick={() => handleVote(anecdote)} />
                )
            }
        </div>
    )
}

export default AnecdoteList