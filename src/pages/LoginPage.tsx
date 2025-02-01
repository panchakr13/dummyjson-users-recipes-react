// // import {useEffect} from "react";
// // import {login} from "../services/api.service.ts";
// //
// // export const LoginPage = () => {
// //     useEffect(() => {
// //         login({
// //             username: 'emilys',
// //             password: 'emilyspass',
// //             expiresInMins: 60
// //         });
// //     }, []);
// //     return (
// //         <>login page</>
// //     );
// // };
//
// import { useState } from 'react';
// import { useAppDispatch } from '../redux/hooks/useAppDispatch.tsx';
// import { authSliceActions } from '../redux/slices/authSlice.ts';
// import { login } from '../services/api.service.ts';
// import { useNavigate } from 'react-router-dom';
//
// export const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();
//
//     const handleLogin = async () => {
//         try {
//             const userWithTokens = await login({
//                 username,
//                 password,
//                 expiresInMins: 60,
//             });
//
//             dispatch(authSliceActions.setAuthenticatedUser(userWithTokens));
//             navigate('/');
//         } catch (error) {
//             console.error('Login failed', error);
//         }
//     };
//
//     return (
//         <div>
//             <h2>Login</h2>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// };

import { useState } from 'react';
import { useAppDispatch } from '../redux/hooks/useAppDispatch.tsx';
import { authSliceActions } from '../redux/slices/authSlice.ts';
import { login } from '../services/api.service.ts';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Виконання запиту на входження
            const userWithTokens = await login({
                username,
                password,
                expiresInMins: 60,
            });

            // Збереження користувача в Redux
            dispatch(authSliceActions.setAuthenticatedUser(userWithTokens));

            // Перехід на головну сторінку після успішної аутентифікації
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
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
        </div>
    );
};

