import './LoginPage.css'
import useHandleLogin from "../../hooks/loginHook/useHandleLogin.tsx";
import {Link} from "react-router-dom";

export const LoginPage = () => {

    const {username, setUsername, password, setPassword, handleLogin, errorMessage} = useHandleLogin()

    return (
        <div className="login-box">
            <Link to="/" className="back-to-homepage">Back to the Homepage</Link>
            <div className="login-card">
                <h2>Login Page</h2>
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
                <button onClick={handleLogin}>Sign in</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};
