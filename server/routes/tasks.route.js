import express from 'express'
import { getTasks, getTasksByProject, getTask, updateTask, addTask, deleteTask } from "../controllers/tasks.controlles.js";

const router = express.Router()

router.get('/', getTasks)
router.get('/project/:projectId', getTasksByProject)
router.get('/:id', getTask)
router.put('/:id', updateTask)
router.post('/', addTask)
router.delete('/:id', deleteTask)

export default router
