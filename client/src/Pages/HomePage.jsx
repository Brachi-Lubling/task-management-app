import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearUser } from '../Store/UserSlice';
import { fetchProjects } from '../Store/actions/projectActions';
import CreateProject from '../Components/CreateProject';
import 'primeflex/primeflex.css';

const HomePage = () => {
    const user = useSelector(store => store.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/login');
    };

    const handleViewProjects = () => {
        navigate('/Projects');
    };

    const handleCreateProjectSuccess = async () => {
        setShowCreateModal(false);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface-ground)', padding: '20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    paddingBottom: '20px',
                    borderBottom: '2px solid var(--cyan-900)'
                }}>
                    <h1 style={{ color: 'var(--cyan-900)', margin: 0 }}>
                        # manage your projects #
                    </h1>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'var(--red-500)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-600)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red-500)'}
                    >
                        Logout
                    </button>
                </div>

                {/* Welcome Section */}
                <div style={{
                    backgroundColor: 'var(--surface-card)',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '30px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ color: 'var(--yellow-600)', marginTop: 0 }}>
                        Welcome, {user.name}!
                    </h2>
                    <p style={{ color: 'var(--text-color)' }}>
                        You are successfully logged in. Your email: <strong>{user.email}</strong>
                    </p>
                </div>

                {/* Main Content */}
                <div style={{
                    backgroundColor: 'var(--surface-card)',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ color: 'var(--cyan-900)' }}>Tools</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                        <button
                            onClick={handleViewProjects}
                            style={{
                                padding: '15px',
                                backgroundColor: 'var(--cyan-900)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--cyan-800)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--cyan-900)'}
                        >
                            View Projects
                        </button>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            style={{
                                padding: '15px',
                                backgroundColor: 'var(--yellow-600)',
                                color: 'var(--cyan-900)',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--yellow-500)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--yellow-600)'}
                        >
                            Create Project
                        </button>
                    </div>
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
                        onSuccess={handleCreateProjectSuccess}
                    />
                </div>
            )}
            </div>
        </div>
    );
};

export default HomePage;