import Project from "../models/project.model.js";

export async function getAllProjects() {
    return await Project.find();
}

export async function getProjectById(id) {
    return await Project.findById(id);
}

export async function updateDataOfProject(id, project) {
    return await Project.findByIdAndUpdate(id, project, { new: true });
}

export async function createProject(project) {
    return await Project.create(project);
}

export async function removeProject(id) {
    return await Project.findByIdAndDelete(id);
}
