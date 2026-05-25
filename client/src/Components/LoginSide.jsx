import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError } from '../Store/UserSlice';
import usersAPI from '../Store/api/usersAPI';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const LoginSide = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [loginError, setLoginError] = useState('');
    const [isValidating, setIsValidating] = useState(false);

    const onSubmit = async (data) => {
        setLoginError('');
        setIsValidating(true);

        try {
            console.log('Fetching user with ID: 699b78e6a224131f7f8467cd');
            // Get user from DB
            const response = await usersAPI.getById('699b78e6a224131f7f8467cd');
            console.log('User from DB:', response.data);
            
            const dbUser = response.data;
            
            // Check if credentials match
            if (data.email === dbUser.email && data.password === dbUser.password) {
                console.log('Credentials match! Saving to Redux and navigating...');
                // Save to Redux
                dispatch(setUser(dbUser));
                navigate('/');
            } else if (data.email === dbUser.email) {
                setLoginError('סיסמה שגויה');
            } else {
                setLoginError('המייל לא קיים במערכת');
            }
        } catch (err) {
            console.error('Error:', err);
            setLoginError('שגיאה בהתחברות לשרת');
        }

        setIsValidating(false);
    };

    return (
        <div className="w-full md:w-5" style={{ backgroundColor: 'var(--cyan-900)', padding: '5%' }}>
            <h1 style={{ color: 'var(--bluegray-200)', textAlign: 'left', marginBottom: '30px' }}>sign in</h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: '15%' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'var(--bluegray-200)', display: 'block', marginBottom: '8px' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="הכנס את האימייל שלך"
                        {...register('email', {
                            required: 'דוא"ל חובה',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'דוא"ל לא תקין'
                            }
                        })}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: errors.email ? '2px solid #ff6b6b' : '1px solid var(--bluegray-400)',
                            borderRadius: '4px',
                            backgroundColor: 'var(--bluegray-100)',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }}
                    />
                    {errors.email && (
                        <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px' }}>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'var(--bluegray-200)', display: 'block', marginBottom: '8px' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="הכנס את הסיסמה שלך"
                        {...register('password', {
                            required: 'סיסמה חובה',
                            minLength: {
                                value: 6,
                                message: 'סיסמה חייבת להיות לפחות 6 תווים'
                            }
                        })}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: errors.password ? '2px solid #ff6b6b' : '1px solid var(--bluegray-400)',
                            borderRadius: '4px',
                            backgroundColor: 'var(--bluegray-100)',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }}
                    />
                    {errors.password && (
                        <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px' }}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {loginError && (
                    <div style={{
                        backgroundColor: '#ffe0e0',
                        color: '#c92a2a',
                        padding: '12px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        {loginError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isValidating}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: isValidating ? 'var(--bluegray-400)' : 'var(--yellow-600)',
                        color: 'var(--cyan-900)',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: isValidating ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        if (!isValidating) e.currentTarget.style.backgroundColor = 'var(--yellow-500)';
                    }}
                    onMouseLeave={(e) => {
                        if (!isValidating) e.currentTarget.style.backgroundColor = 'var(--yellow-600)';
                    }}
                >
                    {isValidating ? 'בדיקה...' : 'כניסה'}
                </button>

                <p style={{ color: 'var(--bluegray-300)', fontSize: '12px', marginTop: '20px', textAlign: 'center' }}>
                    אימייל: test@example.com<br />
                    סיסמה: password123
                </p>
            </form>
        </div>
    );
};

export default LoginSide;