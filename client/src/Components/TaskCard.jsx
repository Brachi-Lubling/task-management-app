import { Card } from 'primereact/card';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTaskAction } from '../Store/actions/taskActions';
import EditTask from './EditTask';
import { useState } from 'react';
import { Button } from 'primereact/button';

const TaskCard = ({ id }) => {
    const task = useSelector(store => store.tasks.entities[id]);
    const dispatch = useDispatch();
    const [showEditModal, setShowEditModal] = useState(false);

    if (!task) {
        return null;
    }

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
            dispatch(deleteTaskAction(id));
        }
    };

    const footer = (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.25rem",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Button
                label="Edit"
                icon="pi pi-pen-to-square"
                onClick={handleEdit}
                className="p-button-info"
                style={{
                    flex: "1",
                    width: "100%",
                    fontSize: "0.8rem",
                    padding: "0.25rem"
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
                    fontSize: "0.8rem",
                    padding: "0.25rem"
                }}
            />
        </div>
    );

    return (
        <>
            <Card
                title={task.title || 'Task'}
                subTitle={task.priority || 'Normal'}
                footer={footer}
                pt={{
                    root: { style: { fontSize: '12px' } },
                    body: { style: { padding: '0.5rem', margin: '0' } },
                    title: { style: { fontSize: '12px', marginBottom: '0.2rem' } },
                    subTitle: { style: { fontSize: '10px', marginBottom: '0.3rem' } },
                    content: { style: { padding: '0.5rem' } },
                    footer: { style: { padding: '0.4rem', gap: '0.25rem' } }
                }}
            >
                <p style={{ margin: 0, fontSize: '11px' }}>
                    {task.description || task.title || 'No description'}
                </p>
            </Card>

            {/* Edit Task Modal */}
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
                    zIndex: 1001
                }}>
                    <EditTask
                        task={task}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={handleEditSuccess}
                    />
                </div>
            )}
        </>
    );
};

export default TaskCard;
