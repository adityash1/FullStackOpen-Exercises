import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        onFilter: (state, action) => {
            return action.payload
        },
    }
})

export const { onFilter } = filterSlice.actions
export default filterSlice.reducer