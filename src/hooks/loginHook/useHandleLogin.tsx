import {useState} from "react";
import {useAppDispatch} from "../../redux/reduxHooks/useAppDispatch.tsx";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/authUser.api.service.ts";
import {authSliceActions} from "../../redux/slices/authSlice.ts";

const useHandleLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
            console.error('Auth was failed', error);

            setErrorMessage('Please, write correct username or password');
        }
    };
    return {username, setUsername, password, setPassword, handleLogin, errorMessage}
};

export default useHandleLogin;