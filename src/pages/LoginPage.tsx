import { useState } from 'react';
import { useAppDispatch } from '../redux/hooks/useAppDispatch.tsx';
import { authSliceActions } from '../redux/slices/authSlice.ts';
import { login } from '../services/api.service.ts';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Стейт для помилки
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userWithTokens = await login({
                username,
                password,
                expiresInMins: 60,
            });

            dispatch(authSliceActions.setAuthenticatedUser(userWithTokens));

            navigate('/');
        } catch (error) {
            console.error('Login failed', error);

            setErrorMessage('Incorrect username or password');  // Текст повідомлення
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
        </div>
    );
};
