import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateTaskAction } from '../Store/actions/taskActions';
import { useState } from 'react';

const EditTask = ({ task, onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '',
            priority: task?.priority || 'normal',
            status: task?.status || 'to do'
        }
    });
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setSubmitError('');
        setIsSubmitting(true);

        try {
            console.log('Updating task:', data);
            
            // Dispatch action to update task
            await dispatch(updateTaskAction(task._id, data));
            
            // Reset form
            reset();
            
            // Call callback if provided
            if (onSuccess) {
                onSuccess();
            }
            
            // Close modal if provided
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error('Error updating task:', err);
            const errorMessage = err.response?.data?.error || err.message || 'שגיאה בעדכון המשימה';
            setSubmitError(errorMessage);
        }

        setIsSubmitting(false);
    };

    return (
        <div style={{
            backgroundColor: 'var(--surface-card)',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
        }}>
            <h2 style={{ color: 'var(--cyan-900)', marginTop: 0, marginBottom: '20px' }}>
                עריכת משימה
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title Field */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'var(--cyan-900)', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        כותרת המשימה
                    </label>
                    <input
                        type="text"
                        placeholder="הכנס כותרת המשימה"
                        {...register('title', {
                            required: 'כותרת המשימה חובה',
                            minLength: {
                                value: 3,
                                message: 'כותרת המשימה חייבת להיות לפחות 3 תווים'
                            }
                        })}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: errors.title ? '2px solid #ff6b6b' : '1px solid var(--surface-border)',
                            borderRadius: '4px',
                            backgroundColor: 'var(--surface-ground)',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit'
                        }}
                    />
                    {errors.title && (
                        <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', margin: '5px 0 0 0' }}>
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Description Field */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'var(--cyan-900)', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        תיאור המשימה
                    </label>
                    <textarea
                        placeholder="הכנס תיאור של המשימה"
                        {...register('description', {
                            required: 'תיאור המשימה חובה',
                            minLength: {
                                value: 3,
                                message: 'התיאור חייב להיות לפחות 3 תווים'
                            }
                        })}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: errors.description ? '2px solid #ff6b6b' : '1px solid var(--surface-border)',
                            borderRadius: '4px',
                            backgroundColor: 'var(--surface-ground)',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            minHeight: '80px',
                            resize: 'vertical'
                        }}
                    />
                    {errors.description && (
                        <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', margin: '5px 0 0 0' }}>
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Priority Field */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'var(--cyan-900)', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        עדיפות
                    </label>
                    <select
                        {...register('priority')}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid var(--surface-border)',
                            borderRadius: '4px',
                            backgroundColor: 'var(--surface-ground)',
                            fontSize: '14px',
                            fontFamily: 'inherit',
                            color: 'var(--text-color)'
                        }}
                    >
                        <option value="low">נמוכה</option>
                        <option value="normal">סטנדרטית</option>
                        <option value="high">גבוהה</option>
                    </select>
                </div>

                {/* Status Field */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'var(--cyan-900)', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        סטטוס
                    </label>
                    <select
                        {...register('status')}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid var(--surface-border)',
                            borderRadius: '4px',
                            backgroundColor: 'var(--surface-ground)',
                            fontSize: '14px',
                            fontFamily: 'inherit',
                            color: 'var(--text-color)'
                        }}
                    >
                        <option value="to do">To Do</option>
                        <option value="in progress">In Progress</option>
                        <option value="in review">In Review</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                {/* Submit Error */}
                {submitError && (
                    <div style={{
                        backgroundColor: '#ffe0e0',
                        color: '#c92a2a',
                        padding: '12px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        {submitError}
                    </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: 'var(--surface-border)',
                                color: 'var(--text-color)',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            ביטול
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: isSubmitting ? 'var(--surface-border)' : 'var(--yellow-600)',
                            color: 'var(--cyan-900)',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--yellow-500)';
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--yellow-600)';
                        }}
                    >
                        {isSubmitting ? 'מעדכן...' : 'עדכן משימה'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;
