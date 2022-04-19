// import { useDispatch } from "react-redux"
import { onFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {
    // const dispatch = useDispatch()

    const handleChange = (event) => {
        // dispatch(onFilter(event.target.value))
        props.onFilter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

// export default Filter
export default connect(null, { onFilter })(Filter)