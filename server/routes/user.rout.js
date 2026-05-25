import express from 'express'
import { getUsers, getUser, updateUser, addUser, deleteUser } from "../controllers/user.controlles.js";

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.post('/', addUser)
router.delete('/:id', deleteUser)

export default router