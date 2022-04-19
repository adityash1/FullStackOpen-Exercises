import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { notify, mute } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(notify(`You voted for '${anecdote.content}'`))
        setTimeout(() => dispatch(mute()), 3000)
    }

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        let res = anecdotes
        if (filter) {
            res = anecdotes.filter(anecdote =>
                anecdote.content.includes(filter))
        }
        return res
    })

    return (
        <div>
            <div>
                {
                    anecdotes.map(anecdote =>
                        <Anecdote key={anecdote.id} anecdote={anecdote}
                            handleClick={() => handleVote(anecdote)} />
                    )
                }
            </div>
        </div>
    )
}

export default AnecdoteList