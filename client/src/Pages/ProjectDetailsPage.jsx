import StatusColumn from "../Components/StatusColumn";
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { fetchTasksByProject } from "../Store/actions/taskActions";
import { Button } from "primereact/button";
import { clearUser } from "../Store/UserSlice";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchedRef = useRef(null);
  const project = useSelector(store => store.projects.entities[id]);
  const { ids: taskIds, loading, error } = useSelector(store => store.tasks);

  useEffect(() => {
    if (id && fetchedRef.current !== id) {
      console.log('Fetching tasks for project:', id);
      fetchedRef.current = id;
      dispatch(fetchTasksByProject(id));
    }
  }, [id, dispatch]);

  console.log('Project found:', project);
  console.log('Tasks loading:', loading);
  console.log('Task IDs:', taskIds);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/Projects');
  };

  if (!project) {
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
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>Project not found</p>
        <Button
          label="Back to Projects"
          icon="pi pi-arrow-left"
          onClick={handleBack}
          className="p-button"
        />
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
          <Button
            icon="pi pi-arrow-left"
            onClick={handleBack}
            className="p-button p-button-text"
            style={{
              color: 'white',
              padding: '0.5rem',
              fontSize: '1.2rem'
            }}
          />
          <h2 style={{ 
            color: 'white', 
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            {project.name}
          </h2>
        </div>
        
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

      {/* Project Header */}
      <div style={{ 
        padding: '30px 40px',
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: 'var(--cyan-900)', fontSize: '28px' }}>
          {project.name}
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          {project.description}
        </p>
      </div>

      {/* Kanban Board */}
      <div style={{ 
        padding: '30px 20px',
        minHeight: 'calc(100vh - 280px)',
        backgroundColor: '#f5f5f5'
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px'
          }}>
            <p style={{ fontSize: '16px', color: '#666' }}>Loading tasks...</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            padding: '0 20px'
          }}>
            <StatusColumn status="to do" projectId={id} />
            <StatusColumn status="in progress" projectId={id} />
            <StatusColumn status="done" projectId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
