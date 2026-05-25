import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProjectAction } from '../Store/actions/projectActions';
import { fetchTasksByProject } from '../Store/actions/taskActions';
import EditProject from './EditProject';

const ProjectCard = ({ id }) => {
    const project = useSelector(store => store.projects.entities[id]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDetails = async () => {
        // Fetch tasks for this project and navigate
        await dispatch(fetchTasksByProject(id));
        navigate(`/projects/${id}`);
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
            dispatch(deleteProjectAction(id));
        }
    };

    const header = (
        <img
            alt="Card"
            src="https://primefaces.org/cdn/primereact/images/usercard.png"
            style={{ width: '100%', borderRadius: "6px" }}
        />
    );

    const footer = (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "0.5rem",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Button
                label="Details"
                icon="pi pi-info-circle"
                onClick={handleDetails}
                className="p-button"
                style={{
                    flex: "1",
                    width: "100%",
                    fontSize: "0.9rem",
                    padding: "0.5rem"
                }}
            />
            <Button
                label="Edit"
                icon="pi pi-pen-to-square"
                onClick={handleEdit}
                className="p-button-info"
                style={{
                    flex: "1",
                    width: "100%",
                    fontSize: "0.9rem",
                    padding: "0.5rem"
                }}
            />
            <Button
                label="Delete"
                icon="pi pi-trash"
                onClick={handleDelete}
                className="p-button-danger"
                style={{
                    flex: "1",
                    width: "100%",
                    fontSize: "0.9rem",
                    padding: "0.5rem"
                }}
            />
        </div>
    );

    return (
        <div style={{ padding: "0.75rem" }}>
            <Card
                title={<span style={{ fontSize: "1.05rem" }}>{project.name}</span>}
                subTitle={<span style={{ fontSize: "0.9rem" }}>{project.createdDate}</span>}
                footer={footer}
                header={header}
                style={{
                    width: "clamp(260px, 25%, 380px)",  
                    fontSize: "1rem"
                }}
                pt={{
                    content: {
                        style: { padding: "1rem" }
                    }
                }}
            >
                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                    {project.description}
                </p>
            </Card>

            {/* Edit Project Modal */}
            {showEditModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <EditProject
                        project={project}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={handleEditSuccess}
                    />
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
