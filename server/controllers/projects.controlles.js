import { getAllProjects, getProjectById, updateDataOfProject, createProject, removeProject } from "../services/project.services.js";

export async function getProjects(req, res) {    
  try {
    const projects = await getAllProjects();
    res.json(projects); 
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getProject(req, res) {
    try {
        const id = req.params.id;
        res.json(await getProjectById(id));
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function updateProject(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const project = await updateDataOfProject(id, body);
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function addProject(req, res) {
  try {
    const project = await createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
}

export async function deleteProject(req, res) {
    try {
        const id = req.params.id;
        const project = await removeProject(id);
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
