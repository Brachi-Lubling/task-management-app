

import { getAllUsers, getUserById, updateDataOfUser, createUser, removeUser } from "../services/user.services.js"

export async function getUsers(req, res) {    
  try {
    const users = await getAllUsers();
    res.json(users); 
  } catch (err) {
    res.status(500).json(err);
  }
}


export async function getUser(req, res) {
    try {
        const id = req.params.id
        console.log('Fetching user with ID:', id);
        const user = await getUserById(id)
        console.log('User found:', user);
        res.json(user)
    } catch (err) {
        console.error('Error fetching user:', err.message);
        res.status(500).json({ error: err.message })
    }
}

export async function updateUser(req, res) {
    try {
        const id = req.params.id
        const body = req.body
        const user = await updateDataOfUser(id, body)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function addUser(req, res) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
}



export async function deleteUser(req, res) {
    try {
        const id = req.params.id
        const user = await removeUser(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}