import { createSlice } from '@reduxjs/toolkit'

const initVal = {
    entities: {},
    ids: [],
    loading: false,
    error: null
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState: initVal,
    reducers: {
        setTasks: (state, action) => {
            state.entities = {}
            state.ids = []
            action.payload.forEach(task => {
                // normalize projectId: some APIs return `project` (object or id)
                if (!task.projectId && task.project) {
                    task.projectId = typeof task.project === 'string' ? task.project : task.project._id;
                }
                state.entities[task._id] = task
                state.ids.push(task._id)
            })
            state.error = null
        },
        addTask: (state, action) => {
            const task = action.payload
            // normalize projectId if needed
            if (!task.projectId && task.project) {
                task.projectId = typeof task.project === 'string' ? task.project : task.project._id;
            }
            state.entities[task._id] = task
            state.ids.push(task._id)
            state.error = null
        },
        removeTask: (state, action) => {
            const id = action.payload
            delete state.entities[id]
            state.ids = state.ids.filter(x => x !== id)
            state.error = null
        },
        updateTask: (state, action) => {
            const { _id, ...updates } = action.payload
            // normalize incoming project field on updates
            if (updates.project && !updates.projectId) {
                updates.projectId = typeof updates.project === 'string' ? updates.project : updates.project._id;
            }
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

export const { setTasks, addTask, removeTask, updateTask, setLoading, setError } = tasksSlice.actions
export default tasksSlice.reducer
