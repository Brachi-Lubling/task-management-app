import { getAllTasks, getTasksByProjectId, getTaskById, updateDataOfTask, createTask, removeTask } from "../services/task.services.js";

export async function getTasks(req, res) {    
  try {
    const tasks = await getAllTasks();
    res.json(tasks); 
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getTasksByProject(req, res) {
    try {
        const projectId = req.params.projectId;
        const tasks = await getTasksByProjectId(projectId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function getTask(req, res) {
    try {
        const id = req.params.id;
        res.json(await getTaskById(id));
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function updateTask(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const task = await updateDataOfTask(id, body);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function addTask(req, res) {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
}

export async function deleteTask(req, res) {
    try {
        const id = req.params.id;
        const task = await removeTask(id);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
