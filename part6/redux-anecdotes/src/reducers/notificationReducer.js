import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notify: (state, action) => {
            return action.payload
        },
        mute: (state, action) => {
            return null
        }
    }
})

// const reducer = (state = null, action) => {
//     switch (action.type) {
//         case 'NOTIFY':
//             return action.data.message
//         case 'MUTE':
//             return null
//         default:
//             return null
//     }
// }

// const notify = (message) => ({
//     'type': 'NOTIFY',
//     'data': { message }
// })

export const setNotification = (message, timeout = 5) => dispatch => {
    timeout = timeout * 1000
    dispatch(notify(message))
    setTimeout(() => {
        dispatch(mute())
    }, timeout)
}

export const { notify, mute } = notificationSlice.actions
export default notificationSlice.reducer