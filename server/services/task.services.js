import Task from "../models/task.model.js";

export async function getAllTasks() {
    return await Task.find();
}

export async function getTasksByProjectId(projectId) {
    return await Task.find({ projectId: projectId });
}

export async function getTaskById(id) {
    return await Task.findById(id);
}

export async function updateDataOfTask(id, task) {
    return await Task.findByIdAndUpdate(id, task, { new: true });
}

export async function createTask(task) {
    return await Task.create(task);
}

export async function removeTask(id) {
    return await Task.findByIdAndDelete(id);
}
