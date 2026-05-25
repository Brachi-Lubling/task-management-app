import { useEffect, useState } from "react"
import ProjectCard from "../Components/ProjectCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects } from "../Store/actions/projectActions"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import { clearUser } from "../Store/UserSlice"
import CreateProject from "../Components/CreateProject"

const ProjectsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projects = useSelector(store => store.projects);
    const user = useSelector(store => store.user.user);
    const { ids, loading, error } = projects;
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/login');
    };

    const handleCreateSuccess = () => {
        setShowCreateModal(false);
    };

    if (loading) {
        return (
            <div style={{ 
                padding: '40px 20px', 
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <div style={{ fontSize: '18px', color: '#666' }}>Loading projects...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                padding: '40px 20px', 
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <div style={{ color: '#c92a2a', fontSize: '18px', marginBottom: '20px' }}>
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* Navbar */}
            <div style={{
                backgroundColor: 'var(--cyan-900)',
                padding: '15px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <h2 style={{ 
                        color: 'white', 
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                        📋 Projects Manager
                    </h2>
                </div>
                
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <Button
                        label="Add Project"
                        icon="pi pi-plus"
                        onClick={() => setShowCreateModal(true)}
                        className="p-button p-button-success"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem'
                        }}
                    />
                    <Button
                        label="Logout"
                        icon="pi pi-sign-out"
                        onClick={handleLogout}
                        className="p-button p-button-danger"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div style={{ padding: '40px 20px' }}>
                {/* Header Section */}
                <div style={{ 
                    marginBottom: '40px'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px', color: 'var(--cyan-900)' }}>
                            My Projects
                        </h1>
                        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                            Welcome {user?.name || 'User'}! You have {ids.length} project{ids.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {/* Projects Grid */}
                {ids.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                            No projects found. Create your first project to get started!
                        </p>
                        <Button
                            label="Create Project"
                            icon="pi pi-plus"
                            onClick={() => setShowCreateModal(true)}
                            className="p-button p-button-success"
                            style={{
                                padding: '0.75rem 1.5rem'
                            }}
                        />
                    </div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                        gap: '20px'
                    }}>
                        {ids.map(id => <ProjectCard key={id} id={id} />)}
                    </div>
                )}
            </div>

            {/* Create Project Modal */}
            {showCreateModal && (
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
                    <CreateProject
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={handleCreateSuccess}
                    />
                </div>
            )}
        </div>
    )
}

export default ProjectsPage