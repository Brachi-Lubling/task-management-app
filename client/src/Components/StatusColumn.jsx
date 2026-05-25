import React, { useState } from 'react';
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';
import TaskCard from './TaskCard'
import { Button } from 'primereact/button';
import { useSelector } from "react-redux"
import CreateTask from './CreateTask';
import { Dialog } from 'primereact/dialog';


const StatusColumn = ({ status, projectId }) => {
    const taskIds = useSelector(store => store.tasks.ids);
    const taskEntities = useSelector(store => store.tasks.entities);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    
    console.log('StatusColumn rendering with:', { status, projectId, taskIds: taskIds.length });
    
    // Filter tasks by project and status
    const tasksOnStatusAndProject = taskIds
        .filter(id => {
            const task = taskEntities[id];
            const match = task && String(task.projectId) === String(projectId) && task.status === status;
            if (match) {
                console.log('Task match:', task.title, task.projectId, task.status);
            }
            return match;
        })
        .map(id => taskEntities[id]);

    const itemTemplate = (task) => {
        return (
            <div style={{ paddingBottom: '0.75rem' }}>
                <TaskCard id={task._id} />
            </div>
        );
    };

    const handleAddTask = () => {
        setShowCreateTaskModal(true);
    };

    const handleCreateSuccess = () => {
        setShowCreateTaskModal(false);
    };

    const footer = () => {
        return (
            <Button 
                label="Add Task" 
                icon="pi pi-plus" 
                onClick={handleAddTask}
                style={{ width: '100%' }}
                className="p-button-rounded p-button-sm"
            />
        )
    }

    const statusColors = {
        'to do': '#ef4444',
        'in progress': '#f59e0b',
        'done': '#10b981'
    };

    return (
        <div style={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Panel 
                header={status.toUpperCase()} 
                footer={footer}
                style={{
                    borderRadius: '12px',
                    overflow: 'visible',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                pt={{
                    root: { style: { borderRadius: '12px', overflow: 'visible', height: '100%', display: 'flex', flexDirection: 'column' } },
                    header: { style: { 
                        backgroundColor: statusColors[status] || '#4a90a4', 
                        borderTopLeftRadius: '12px', 
                        borderTopRightRadius: '12px',
                        padding: '14px 16px',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }},
                    content: { style: { 
                        backgroundColor: '#f9fafb', 
                        padding: '12px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '400px',
                        borderLeft: `4px solid ${statusColors[status] || '#4a90a4'}`
                    }},
                    footer: { style: { 
                        backgroundColor: '#f9fafb', 
                        borderBottomLeftRadius: '12px', 
                        borderBottomRightRadius: '12px',
                        padding: '10px 12px',
                        borderTop: '1px solid #e5e7eb'
                    }}
                }}
            >
                {tasksOnStatusAndProject.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#9ca3af',
                        minHeight: '300px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                        <p style={{ fontSize: '14px', margin: 0 }}>No tasks yet</p>
                    </div>
                ) : (
                    <ScrollPanel style={{ width: '100%', height: '400px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '8px' }}>
                            {tasksOnStatusAndProject.map((task) => (
                                <div key={task._id}>
                                    {itemTemplate(task)}
                                </div>
                            ))}
                        </div>
                    </ScrollPanel>
                )}
            </Panel>

            {/* Create Task Modal */}
            <Dialog 
                visible={showCreateTaskModal} 
                onHide={() => setShowCreateTaskModal(false)}
                header="Create New Task"
                modal
                style={{ width: '90vw', maxWidth: '500px' }}
                headerStyle={{ backgroundColor: statusColors[status] || '#4a90a4', color: 'white' }}
            >
                <CreateTask
                    projectId={projectId}
                    initialStatus={status}
                    onClose={() => setShowCreateTaskModal(false)}
                    onSuccess={handleCreateSuccess}
                />
            </Dialog>
        </div>
    );
}

export default StatusColumn