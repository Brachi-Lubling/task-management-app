import { createSlice } from '@reduxjs/toolkit'

const initVal = {
    entities: {},
    ids: [],
    loading: false,
    error: null
}

const projectsSlice = createSlice({
    name: "projects",
    initialState: initVal,
    reducers: {
        setProjects: (state, action) => {
            state.entities = {}
            state.ids = []
            action.payload.forEach(project => {
                state.entities[project._id] = project
                state.ids.push(project._id)
            })
            state.error = null
        },
        addProject: (state, action) => {
            const project = action.payload
            state.entities[project._id] = project
            state.ids.push(project._id)
            state.error = null
        },
        removeProject: (state, action) => {
            const id = action.payload
            delete state.entities[id]
            state.ids = state.ids.filter(x => x !== id)
            state.error = null
        },
        updateProject: (state, action) => {
            const { _id, ...updates } = action.payload
            state.entities[_id] = { ...state.entities[_id], ...updates }
            state.error = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const { setProjects, addProject, removeProject, updateProject, setLoading, setError } = projectsSlice.actions
export default projectsSlice.reducer
