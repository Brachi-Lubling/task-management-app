import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


import { configureStore } from '@reduxjs/toolkit';
import ProjectsSlice from './Store/ProjectsSlice.js';
import UserSlice from './Store/UserSlice.js';
import TasksSlise from './Store/TasksSlice.js'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    user: UserSlice,
    projects: ProjectsSlice,
    tasks: TasksSlise
  }
})


createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</StrictMode>,
)
