import { createSlice } from '@reduxjs/toolkit'

const initVal = {
    user: {
        _id: '',
        name: '',
        email: '',
        password: ''
    },
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState: initVal,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.error = null
        },
        updateUserData: (state, action) => {
            state.user = { ...state.user, ...action.payload }
            state.error = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        clearUser: (state) => {
            state.user = { _id: '', name: '', email: '', password: '' }
            state.error = null
        }
    }
})

export const { setUser, updateUserData, setLoading, setError, clearUser } = userSlice.actions
export default userSlice.reducer
